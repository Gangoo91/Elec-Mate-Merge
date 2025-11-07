import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface ResourcesSectionProps {
  resources: {
    team?: Array<{ role: string; quantity: number; duration?: number } | string>;
    labour?: Array<{ role?: string; name?: string; quantity?: number; count?: number } | string>;
    materials?: Array<{ description?: string; name?: string; quantity?: string; amount?: string } | string>;
    equipment?: string[];
  };
}

const ResourcesSection = ({ resources }: ResourcesSectionProps) => {
  const hasLabour = (resources.labour && resources.labour.length > 0) || (resources.team && resources.team.length > 0);
  const hasMaterials = resources.materials && resources.materials.length > 0;
  const hasEquipment = resources.equipment && resources.equipment.length > 0;

  if (!hasLabour && !hasMaterials && !hasEquipment) return null;

  const labourList = resources.team || resources.labour || [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-pink-400" />
          Resource Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasLabour && (
          <div>
            <div className="text-sm font-medium mb-2">Labour & Team</div>
            <div className="space-y-2">
              {labourList.map((item: any, idx: number) => {
                const role = typeof item === 'string' ? item : item.role || item.name || 'Team Member';
                const quantity = typeof item === 'string' ? '1' : item.quantity || item.count || '1';
                const duration = typeof item !== 'string' && item.duration ? ` for ${item.duration} days` : '';
                
                return (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between text-sm bg-muted/30 p-3 rounded-lg"
                  >
                    <span className="font-medium">{role}</span>
                    <span className="text-muted-foreground">
                      {quantity} {parseInt(quantity) === 1 ? 'person' : 'people'}{duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {hasMaterials && (
          <div>
            <div className="text-sm font-medium mb-2">Key Materials</div>
            <div className="space-y-2">
              {resources.materials!.map((item: any, idx: number) => {
                const description = typeof item === 'string' ? item : item.description || item.name || 'Material';
                const quantity = typeof item === 'string' ? '-' : item.quantity || item.amount || '-';
                
                return (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between text-sm bg-muted/30 p-3 rounded-lg"
                  >
                    <span>{description}</span>
                    <span className="text-muted-foreground">{quantity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {hasEquipment && (
          <div>
            <div className="text-sm font-medium mb-2">Equipment</div>
            <div className="flex flex-wrap gap-2">
              {resources.equipment!.map((item: string, idx: number) => (
                <div 
                  key={idx}
                  className="text-xs bg-muted/30 px-3 py-2 rounded-lg"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourcesSection;
