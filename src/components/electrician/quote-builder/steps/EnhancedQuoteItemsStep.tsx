import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Clock, FileText, Plus } from "lucide-react";
import { QuoteItem, JobTemplate } from "@/types/quote";
import { JobTemplates } from "../JobTemplates";
import { LiveMaterialPricing } from "./LiveMaterialPricing";
import { useQuoteMaterialIntegration } from "@/hooks/useQuoteMaterialIntegration";
import { ManualEntryForm } from "../ManualEntryForm";
import { QuoteItemsList } from "../QuoteItemsList";

interface EnhancedQuoteItemsStepProps {
  items: QuoteItem[];
  onAdd: (item: Omit<QuoteItem, 'id' | 'totalPrice'>) => void;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
  priceAdjustment?: number;
  setPriceAdjustment?: (adjustment: number) => void;
  calculateAdjustedPrice?: (basePrice: number) => number;
}

export const EnhancedQuoteItemsStep = ({ items, onAdd, onUpdate, onRemove, priceAdjustment = 0, setPriceAdjustment, calculateAdjustedPrice }: EnhancedQuoteItemsStepProps) => {
  const { addMaterialToQuote, addMultipleMaterialsToQuote } = useQuoteMaterialIntegration(onAdd);

  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach(item => {
      onAdd(item);
    });
  };

  const handleDuplicateItem = (item: QuoteItem) => {
    const duplicate = {
      description: `${item.description} (Copy)`,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      category: item.category,
      subcategory: item.subcategory,
      workerType: item.workerType,
      hours: item.hours,
      hourlyRate: item.hourlyRate,
      materialCode: item.materialCode,
      equipmentCode: item.equipmentCode,
      notes: item.notes
    };
    onAdd(duplicate);
  };

  return (
    <div className="space-y-6">
      <DropdownTabs
        tabs={[
          {
            value: "manual",
            label: "Manual Entry",
            icon: Plus,
            content: (
              <ManualEntryForm 
                onAdd={onAdd}
                priceAdjustment={priceAdjustment}
                calculateAdjustedPrice={calculateAdjustedPrice}
              />
            )
          },
          {
            value: "live-pricing",
            label: "Live Pricing",
            icon: Clock,
            content: (
              <LiveMaterialPricing 
                onAddToQuote={addMaterialToQuote}
                onAddMultipleToQuote={addMultipleMaterialsToQuote}
              />
            )
          },
          {
            value: "templates",
            label: "Job Templates",
            icon: FileText,
            content: <JobTemplates onSelectTemplate={handleTemplateSelect} />
          }
        ]}
      />
      
      {/* Quote Items List */}
      <QuoteItemsList
        items={items}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onDuplicate={handleDuplicateItem}
      />
    </div>
  );
};