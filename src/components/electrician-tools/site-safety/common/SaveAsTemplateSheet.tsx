import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { useSaveAsTemplate, ModuleType } from "@/hooks/useSafetyFormTemplates";

interface SaveAsTemplateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleType: ModuleType;
  getTemplateData: () => Record<string, unknown>;
}

export function SaveAsTemplateSheet({
  open,
  onOpenChange,
  moduleType,
  getTemplateData,
}: SaveAsTemplateSheetProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const saveTemplate = useSaveAsTemplate();

  const handleSave = async () => {
    if (!name.trim()) return;

    const data = getTemplateData();
    await saveTemplate.mutateAsync({
      name: name.trim(),
      description: description.trim() || undefined,
      moduleType,
      templateData: data,
    });

    setName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl p-0">
        <div className="p-5 space-y-4">
          <h3 className="text-base font-semibold text-white">Save as Template</h3>
          <p className="text-xs text-white">
            Save the current form data as a reusable template for future use.
          </p>

          <div className="space-y-3">
            <div>
              <Label className="text-white text-sm">Template Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Standard COSHH for resin work"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-white text-sm">Description (optional)</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of when to use this template"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={!name.trim() || saveTemplate.isPending}
            className="w-full h-11 bg-elec-yellow text-black font-semibold touch-manipulation"
          >
            {saveTemplate.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Template
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
