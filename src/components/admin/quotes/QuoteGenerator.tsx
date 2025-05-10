
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  QuoteGeneratorProps, 
  QuoteFormData, 
  MaterialItem 
} from "./types";
import { 
  getDefaultMaterialsForJobType, 
  generateDefaultScopeOfWork,
  calculateLabourDays
} from "./utils/quoteUtils";

// Import refactored components
import ClientInformation from "./components/ClientInformation";
import JobDetails from "./components/JobDetails";
import MaterialsLabour from "./components/MaterialsLabour";

const QuoteGenerator = ({ onGenerateQuote, initialJobType = "rewire" }: QuoteGeneratorProps) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState<string>(initialJobType);
  const [formData, setFormData] = useState<QuoteFormData>({
    clientName: "",
    clientAddress: "",
    propertyType: "house",
    bedrooms: "3",
    floors: "2",
    scopeOfWork: "",
    additionalRequirements: ""
  });
  
  // Materials state
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: 1, description: "Consumer Unit", quantity: 1, unitPrice: 120 },
    { id: 2, description: "Twin Sockets", quantity: 10, unitPrice: 8 }
  ]);
  
  // Update jobType when initialJobType changes (from template selection)
  useEffect(() => {
    setJobType(initialJobType);
    // Clear or update scope of work when template changes
    setFormData(prevData => ({
      ...prevData,
      scopeOfWork: ""
    }));
  }, [initialJobType]);
  
  // Update default materials based on job type
  useEffect(() => {
    setMaterials(getDefaultMaterialsForJobType(jobType));
  }, [jobType]);
  
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
  
  const handleGenerateWithAI = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Calculate material costs
      const materialCost = materials.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      
      // Calculate appropriate labour cost based on job type and inputs
      const labourDays = calculateLabourDays(jobType, formData.bedrooms);
      const labourRate = 250; // Daily rate in £
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
  
  return (
    <div className="space-y-6">
      <ClientInformation 
        formData={formData}
        handleInputChange={handleInputChange}
        isMobile={isMobile}
      />
      
      <JobDetails 
        formData={formData}
        jobType={jobType}
        setJobType={setJobType}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        isMobile={isMobile}
      />
      
      <MaterialsLabour 
        materials={materials}
        addMaterialItem={addMaterialItem}
        removeMaterialItem={removeMaterialItem}
        updateMaterialItem={updateMaterialItem}
        isMobile={isMobile}
        isLoading={isLoading}
        handleGenerateWithAI={handleGenerateWithAI}
        formData={formData}
        jobType={jobType}
      />
    </div>
  );
};

export default QuoteGenerator;
