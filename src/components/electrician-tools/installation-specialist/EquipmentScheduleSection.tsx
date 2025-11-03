import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { Wrench, Zap, HardHat, Package, CheckCircle2, AlertCircle } from "lucide-react";

interface EquipmentItem {
  name: string;
  category: string;
  certificationRequired?: string;
  inspectionRequired?: boolean;
}

interface EquipmentScheduleSectionProps {
  equipment: EquipmentItem[];
}

const categoryIcons: Record<string, any> = {
  'Power Tools': Zap,
  'Test Equipment': Wrench,
  'Safety Equipment': HardHat,
  'Hand Tools': Wrench,
  'Materials': Package
};

export const EquipmentScheduleSection = ({ equipment }: EquipmentScheduleSectionProps) => {
  if (!equipment || equipment.length === 0) return null;

  // Categorize equipment
  const categorized = equipment.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, EquipmentItem[]>);

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Wrench className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Equipment Schedule & Materials</h3>
          <p className="text-sm text-muted-foreground">{equipment.length} items required</p>
        </div>
      </div>

      <MobileAccordion type="multiple" className="space-y-2">
        {Object.entries(categorized).map(([category, items]) => {
          const Icon = categoryIcons[category] || Package;
          return (
            <MobileAccordionItem key={category} value={category}>
              <MobileAccordionTrigger>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">{category}</span>
                  <Badge variant="outline" className="ml-auto mr-8">{items.length}</Badge>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-card border border-primary/20 rounded-b-lg">
                  <ul className="space-y-2">
                    {items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">•</span>
                        <div className="flex-1">
                          <div className="text-foreground font-medium">{item.name}</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.certificationRequired && (
                              <Badge variant="outline" className="text-xs bg-primary/5">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {item.certificationRequired}
                              </Badge>
                            )}
                            {item.inspectionRequired && (
                              <Badge variant="outline" className="text-xs bg-warning/5 text-warning border-warning/40">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Inspection Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          );
        })}
      </MobileAccordion>
    </Card>
  );
};
