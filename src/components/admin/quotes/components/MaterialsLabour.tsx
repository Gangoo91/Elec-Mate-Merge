
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { MaterialsListProps } from "../types";
import { toast } from "@/hooks/use-toast";

const MaterialsLabour = ({ 
  materials, 
  addMaterialItem, 
  removeMaterialItem, 
  updateMaterialItem,
  isMobile,
  isLoading,
  handleGenerateWithAI,
  formData,
  jobType
}: MaterialsListProps) => {
  
  // Function to check if required fields are filled
  const canGenerateQuote = () => {
    return formData.clientName.trim() !== "" && jobType !== "";
  };

  const handleGenerateClick = () => {
    if (!canGenerateQuote()) {
      toast({
        title: "Missing information",
        description: "Please provide client name and select a job type.",
        variant: "destructive"
      });
      return;
    }
    
    // Call the generate function provided as prop
    handleGenerateWithAI();
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Materials & Labour</CardTitle>
            <CardDescription>Add materials needed for this job</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size={isMobile ? "default" : "sm"} 
            onClick={addMaterialItem} 
            className="flex items-center gap-1"
          >
            <PlusCircle className={`${isMobile ? "h-5 w-5" : "h-4 w-4"}`} />
            <span>Add Item</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-elec-dark/30 rounded-md p-3">
          {/* Mobile version - display labels above each row */}
          <div className="md:hidden space-y-6">
            {materials.map((item) => (
              <div key={item.id} className="rounded-md bg-elec-gray p-3 relative">
                <div className="space-y-4">
                  {/* Description field */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <Input 
                      value={item.description}
                      onChange={(e) => updateMaterialItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                      className="h-12 text-base bg-elec-dark/60"
                    />
                  </div>
                  
                  {/* Quantity and Price in same row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Quantity</label>
                      <Input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateMaterialItem(item.id, "quantity", e.target.value)}
                        className="h-12 text-base text-center bg-elec-dark/60"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Price (£)</label>
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateMaterialItem(item.id, "unitPrice", e.target.value)}
                        className="h-12 text-base text-center bg-elec-dark/60"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Delete button positioned at top right */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeMaterialItem(item.id)}
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                  <span className="sr-only">Delete item</span>
                </Button>
              </div>
            ))}
          </div>
          
          {/* Desktop version - table layout */}
          <div className="hidden md:block">
            {/* Header row for desktop */}
            <div className="grid grid-cols-12 gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-3 text-right">Price (£)</div>
              <div className="col-span-1"></div>
            </div>
            
            <div className="space-y-3">
              {materials.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <Input 
                      value={item.description}
                      onChange={(e) => updateMaterialItem(item.id, "description", e.target.value)}
                      placeholder="Material description"
                      className="h-9 px-2 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateMaterialItem(item.id, "quantity", e.target.value)}
                      className="h-9 text-center px-1 text-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input 
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateMaterialItem(item.id, "unitPrice", e.target.value)}
                      className="h-9 text-right px-1 text-sm"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeMaterialItem(item.id)}
                      className="h-7 w-7 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete item</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {materials.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No materials added yet. Click "Add Item" to start building your quote.
            </div>
          )}
        </div>
        
        <div className="flex justify-center sm:justify-end">
          <Button 
            onClick={handleGenerateClick} 
            disabled={isLoading}
            className={isMobile ? "min-w-full py-6 text-lg font-medium" : "min-w-[150px] w-full sm:w-auto"}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Quote"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsLabour;
