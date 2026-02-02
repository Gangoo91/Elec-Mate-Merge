import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plug, Plus, Trash2, Copy } from 'lucide-react';
import { getDefaultAppliance, Appliance } from '@/types/pat-testing';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PATTestingApplianceListProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const PATTestingApplianceList: React.FC<PATTestingApplianceListProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();

  const addAppliance = () => {
    const appliances = formData.appliances || [];
    const newAppliance = getDefaultAppliance();
    onUpdate('appliances', [...appliances, newAppliance]);
  };

  const updateAppliance = (id: string, field: string, value: any) => {
    const appliances = formData.appliances || [];
    const updatedAppliances = appliances.map((app: Appliance) =>
      app.id === id ? { ...app, [field]: value } : app
    );
    onUpdate('appliances', updatedAppliances);
  };

  const removeAppliance = (id: string) => {
    const appliances = formData.appliances || [];
    onUpdate('appliances', appliances.filter((a: Appliance) => a.id !== id));
  };

  const duplicateAppliance = (appliance: Appliance) => {
    const appliances = formData.appliances || [];
    const newAppliance = {
      ...appliance,
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      assetNumber: '',
      serialNumber: '',
    };
    onUpdate('appliances', [...appliances, newAppliance]);
  };

  return (
    <div className="space-y-6">
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <div className={cn(
          "p-4",
          isMobile ? "bg-card/30 border-y border-border/20" : ""
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Plug className="h-5 w-5 text-blue-500" />
              </div>
              <span className="font-semibold text-lg">Appliance Register</span>
            </div>
            <span className="text-sm font-normal text-muted-foreground">
              {(formData.appliances || []).length} appliances
            </span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {(formData.appliances || []).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Plug className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No appliances added yet.</p>
              <p className="text-sm">Click the button below to add appliances to test.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(formData.appliances || []).map((appliance: Appliance, index: number) => (
                <div key={appliance.id} className={cn(
                  "rounded-lg p-4",
                  isMobile ? "bg-card/20 border border-border/20" : "bg-muted/30"
                )}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Plug className="h-4 w-4 text-blue-500" />
                      Appliance #{index + 1}
                      {appliance.assetNumber && (
                        <span className="text-sm text-muted-foreground">
                          ({appliance.assetNumber})
                        </span>
                      )}
                    </h4>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateAppliance(appliance)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground touch-manipulation"
                        title="Duplicate appliance"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAppliance(appliance.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10 touch-manipulation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    <div>
                      <Label className="text-sm">Asset No. *</Label>
                      <Input
                        placeholder="e.g., PAT001"
                        value={appliance.assetNumber || ''}
                        onChange={(e) => updateAppliance(appliance.id, 'assetNumber', e.target.value)}
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label className="text-sm">Description *</Label>
                      <Input
                        placeholder="e.g., Kettle, Monitor"
                        value={appliance.description || ''}
                        onChange={(e) => updateAppliance(appliance.id, 'description', e.target.value)}
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Make</Label>
                      <Input
                        placeholder="Manufacturer"
                        value={appliance.make || ''}
                        onChange={(e) => updateAppliance(appliance.id, 'make', e.target.value)}
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Model</Label>
                      <Input
                        placeholder="Model"
                        value={appliance.model || ''}
                        onChange={(e) => updateAppliance(appliance.id, 'model', e.target.value)}
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Serial No.</Label>
                      <Input
                        placeholder="Serial number"
                        value={appliance.serialNumber || ''}
                        onChange={(e) => updateAppliance(appliance.id, 'serialNumber', e.target.value)}
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label className="text-sm">Location</Label>
                      <Input
                        placeholder="e.g., Kitchen, Office 1"
                        value={appliance.location || ''}
                        onChange={(e) => updateAppliance(appliance.id, 'location', e.target.value)}
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Class</Label>
                      <Select
                        value={appliance.applianceClass || 'I'}
                        onValueChange={(v) => updateAppliance(appliance.id, 'applianceClass', v)}
                      >
                        <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-white/30">
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-background border-border">
                          <SelectItem value="I">Class I (Earthed)</SelectItem>
                          <SelectItem value="II">Class II (Double Insulated)</SelectItem>
                          <SelectItem value="III">Class III (SELV)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Category</Label>
                      <Select
                        value={appliance.category || 'portable'}
                        onValueChange={(v) => updateAppliance(appliance.id, 'category', v)}
                      >
                        <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-white/30">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-background border-border">
                          <SelectItem value="hand-held">Hand-held</SelectItem>
                          <SelectItem value="portable">Portable</SelectItem>
                          <SelectItem value="moveable">Moveable</SelectItem>
                          <SelectItem value="stationary">Stationary</SelectItem>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="IT">IT Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="outline"
            className="w-full h-11 touch-manipulation border-dashed"
            onClick={addAppliance}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Appliance
          </Button>

          {/* Quick Add Multiple */}
          <div className={cn(
            "rounded-lg p-4",
            isMobile ? "bg-card/20 border border-border/20" : "bg-muted/30"
          )}>
            <h4 className="font-medium mb-2">Quick Add Multiple</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Add multiple blank appliance entries at once
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  for (let i = 0; i < 5; i++) {
                    addAppliance();
                  }
                }}
                className="touch-manipulation"
              >
                +5 Appliances
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  for (let i = 0; i < 10; i++) {
                    addAppliance();
                  }
                }}
                className="touch-manipulation"
              >
                +10 Appliances
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  for (let i = 0; i < 25; i++) {
                    addAppliance();
                  }
                }}
                className="touch-manipulation"
              >
                +25 Appliances
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PATTestingApplianceList;
