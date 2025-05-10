
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuoteGeneratorProps {
  onGenerateQuote: (quoteData: any) => void;
  initialJobType?: string;
}

const QuoteGenerator = ({ onGenerateQuote, initialJobType = "rewire" }: QuoteGeneratorProps) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState<string>(initialJobType);
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    propertyType: "house",
    bedrooms: "3",
    floors: "2",
    scopeOfWork: "",
    additionalRequirements: ""
  });
  
  // Update jobType when initialJobType changes (from template selection)
  useEffect(() => {
    setJobType(initialJobType);
    // Clear or update scope of work when template changes
    setFormData(prevData => ({
      ...prevData,
      scopeOfWork: ""
    }));
  }, [initialJobType]);
  
  const [materials, setMaterials] = useState([
    { id: 1, description: "Consumer Unit", quantity: 1, unitPrice: 120 },
    { id: 2, description: "Twin Sockets", quantity: 10, unitPrice: 8 }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addMaterialItem = () => {
    const newId = materials.length ? Math.max(...materials.map(m => m.id)) + 1 : 1;
    setMaterials([...materials, { id: newId, description: "", quantity: 1, unitPrice: 0 }]);
  };
  
  const removeMaterialItem = (id: number) => {
    setMaterials(materials.filter(item => item.id !== id));
  };
  
  const updateMaterialItem = (id: number, field: string, value: string | number) => {
    setMaterials(materials.map(item => 
      item.id === id ? { ...item, [field]: field === "description" ? value : Number(value) } : item
    ));
  };
  
  // Update default materials based on job type
  useEffect(() => {
    let defaultMaterials = [];
    
    switch (jobType) {
      case "rewire":
        defaultMaterials = [
          { id: 1, description: "Consumer Unit", quantity: 1, unitPrice: 120 },
          { id: 2, description: "Twin Sockets", quantity: 10, unitPrice: 8 },
          { id: 3, description: "Cable (100m roll)", quantity: 2, unitPrice: 45 }
        ];
        break;
      case "eicr":
        defaultMaterials = [
          { id: 1, description: "EICR Certificate", quantity: 1, unitPrice: 15 },
          { id: 2, description: "Minor Remedial Works", quantity: 1, unitPrice: 50 }
        ];
        break;
      case "consumer_unit":
        defaultMaterials = [
          { id: 1, description: "Metal Consumer Unit", quantity: 1, unitPrice: 120 },
          { id: 2, description: "MCBs", quantity: 6, unitPrice: 5 },
          { id: 3, description: "RCDs", quantity: 2, unitPrice: 25 }
        ];
        break;
      case "ev_charger":
        defaultMaterials = [
          { id: 1, description: "EV Charger Unit", quantity: 1, unitPrice: 350 },
          { id: 2, description: "SWA Cable (per meter)", quantity: 10, unitPrice: 4 },
          { id: 3, description: "Dedicated MCB", quantity: 1, unitPrice: 15 }
        ];
        break;
      default:
        defaultMaterials = [
          { id: 1, description: "Consumer Unit", quantity: 1, unitPrice: 120 },
          { id: 2, description: "Twin Sockets", quantity: 10, unitPrice: 8 }
        ];
    }
    
    setMaterials(defaultMaterials);
  }, [jobType]);
  
  const handleGenerateWithAI = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Calculate material costs
      const materialCost = materials.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      
      // Calculate appropriate labour cost based on job type and inputs
      let labourDays = 0;
      let labourRate = 250; // Daily rate in £
      
      switch (jobType) {
        case "rewire":
          labourDays = Number(formData.bedrooms) * 1.5;
          break;
        case "eicr":
          labourDays = Number(formData.bedrooms) * 0.5;
          break;
        case "consumer_unit":
          labourDays = 1;
          break;
        case "ev_charger":
          labourDays = 0.5;
          break;
      }
      
      const labourCost = labourDays * labourRate;
      const subtotal = materialCost + labourCost;
      const vat = subtotal * 0.2;
      const total = subtotal + vat;
      
      // Generate the quote data
      const quoteData = {
        clientInfo: {
          name: formData.clientName,
          address: formData.clientAddress,
        },
        jobDetails: {
          type: jobType,
          propertyType: formData.propertyType,
          bedrooms: formData.bedrooms,
          floors: formData.floors,
          scopeOfWork: formData.scopeOfWork || generateDefaultScopeOfWork(jobType, formData),
          additionalRequirements: formData.additionalRequirements
        },
        materials,
        labour: {
          days: labourDays,
          rate: labourRate,
          total: labourCost
        },
        financials: {
          materialCost,
          labourCost,
          subtotal,
          vat,
          total
        },
        quoteNumber: `QT-${Date.now().toString().substring(7)}`,
        issueDate: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      setIsLoading(false);
      onGenerateQuote(quoteData);
      
    }, 2000);
  };
  
  // Generate default scope of work based on job type and inputs
  const generateDefaultScopeOfWork = (jobType: string, data: any): string => {
    switch (jobType) {
      case "rewire":
        return `Complete rewire of ${data.bedrooms} bedroom ${data.propertyType} with ${data.floors} floors. Includes new consumer unit, ring mains, lighting circuits, and all necessary testing and certification.`;
      case "eicr":
        return `Detailed electrical inspection and testing of all circuits in ${data.bedrooms} bedroom ${data.propertyType}. Provision of comprehensive EICR documentation highlighting any defects or recommendations.`;
      case "consumer_unit":
        return `Supply and installation of new consumer unit with appropriate RCDs and MCBs. Testing of all circuits and provision of installation certificate.`;
      case "ev_charger":
        return `Supply and installation of EV charging point including all necessary wiring, circuit protection, and testing. Includes registration with the appropriate scheme for compliance.`;
      default:
        return "";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>Enter the details of your client and the property</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input 
                id="clientName" 
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="John Smith"
                className={isMobile ? "h-12 text-base" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientAddress">Client Address</Label>
              <Input 
                id="clientAddress" 
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleInputChange}
                placeholder="123 Main Street, London"
                className={isMobile ? "h-12 text-base" : ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Customize the scope of work based on project requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select 
                value={jobType} 
                onValueChange={(value) => setJobType(value)}
              >
                <SelectTrigger className={isMobile ? "h-12 text-base" : ""}>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rewire">Full House Rewire</SelectItem>
                  <SelectItem value="eicr">EICR</SelectItem>
                  <SelectItem value="consumer_unit">Consumer Unit Replacement</SelectItem>
                  <SelectItem value="ev_charger">EV Charger Installation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select 
                value={formData.propertyType} 
                onValueChange={(value) => handleSelectChange("propertyType", value)}
              >
                <SelectTrigger className={isMobile ? "h-12 text-base" : ""}>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="commercial">Commercial Property</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                <Select 
                  value={formData.bedrooms} 
                  onValueChange={(value) => handleSelectChange("bedrooms", value)}
                >
                  <SelectTrigger className={isMobile ? "h-12 text-base" : ""}>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="floors">Number of Floors</Label>
                <Select 
                  value={formData.floors} 
                  onValueChange={(value) => handleSelectChange("floors", value)}
                >
                  <SelectTrigger className={isMobile ? "h-12 text-base" : ""}>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scopeOfWork">Scope of Work</Label>
            <Textarea 
              id="scopeOfWork" 
              name="scopeOfWork"
              value={formData.scopeOfWork}
              onChange={handleInputChange}
              placeholder="Describe the work to be carried out in detail..."
              rows={3}
              className={isMobile ? "min-h-[100px] text-base" : ""}
            />
            <p className="text-xs text-muted-foreground mt-1">Leave blank to auto-generate from job details</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalRequirements">Additional Requirements</Label>
            <Textarea 
              id="additionalRequirements" 
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleInputChange}
              placeholder="Any special requirements or conditions..."
              rows={2}
              className={isMobile ? "min-h-[80px] text-base" : ""}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Materials & Labour</CardTitle>
              <CardDescription>Add materials needed for this job</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addMaterialItem} className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-elec-dark/30 rounded-md p-3">
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
                      className={isMobile ? "h-12 px-3 text-base" : "h-9 px-2 text-sm"}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateMaterialItem(item.id, "quantity", e.target.value)}
                      className={isMobile ? "h-12 text-center px-2 text-base" : "h-9 text-center px-1 text-sm"}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input 
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateMaterialItem(item.id, "unitPrice", e.target.value)}
                      className={isMobile ? "h-12 text-right px-2 text-base" : "h-9 text-right px-1 text-sm"}
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeMaterialItem(item.id)}
                      className={isMobile ? "h-10 w-10 p-0" : "h-7 w-7 p-0"}
                    >
                      <Trash2 className={isMobile ? "h-5 w-5 text-red-500" : "h-4 w-4 text-red-500"} />
                      <span className="sr-only">Delete item</span>
                    </Button>
                  </div>
                </div>
              ))}
              
              {materials.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No materials added yet. Click "Add Item" to start building your quote.
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center sm:justify-end">
            <Button 
              onClick={handleGenerateWithAI} 
              disabled={isLoading || !formData.clientName || !jobType}
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
    </div>
  );
};

export default QuoteGenerator;
