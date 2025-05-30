
import { useState, useEffect, useCallback } from "react";
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
import { supabase } from "@/integrations/supabase/client";

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
  
  // Materials state with UK default materials
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: 1, description: "Consumer Unit (18th Edition)", quantity: 1, unitPrice: 135 },
    { id: 2, description: "13A Twin Socket Outlets", quantity: 8, unitPrice: 12 }
  ]);
  
  // Optimised update functions
  const updateJobType = useCallback((newJobType: string) => {
    setJobType(newJobType);
    setFormData(prevData => ({
      ...prevData,
      scopeOfWork: ""
    }));
  }, []);
  
  // Update jobType when initialJobType changes
  useEffect(() => {
    updateJobType(initialJobType);
  }, [initialJobType, updateJobType]);
  
  // Update default materials based on job type with UK specifications
  useEffect(() => {
    const ukMaterials = getDefaultMaterialsForJobType(jobType).map(material => ({
      ...material,
      // Ensure UK terminology and pricing
      description: material.description.includes("Consumer Unit") 
        ? `${material.description} (BS 7671 Compliant)`
        : material.description,
      unitPrice: Math.round(material.unitPrice * 1.1) // Adjust for current UK pricing
    }));
    setMaterials(ukMaterials);
  }, [jobType]);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const addMaterialItem = useCallback(() => {
    const newId = materials.length ? Math.max(...materials.map(m => m.id)) + 1 : 1;
    setMaterials(prev => [...prev, { 
      id: newId, 
      description: "", 
      quantity: 1, 
      unitPrice: 0 
    }]);
  }, [materials.length]);
  
  const removeMaterialItem = useCallback((id: number) => {
    setMaterials(prev => prev.filter(item => item.id !== id));
  }, []);
  
  const updateMaterialItem = useCallback((id: number, field: string, value: string | number) => {
    setMaterials(prev => prev.map(item => 
      item.id === id ? { 
        ...item, 
        [field]: field === "description" ? value : Number(value) 
      } : item
    ));
  }, []);
  
  // Enhanced AI quote generation with better UK focus
  const handleGenerateWithAI = async () => {
    if (!formData.clientName || !jobType) {
      toast({
        title: "Missing Information",
        description: "Please provide client name and select a job type to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const propertyDetails = {
        type: formData.propertyType,
        bedrooms: formData.bedrooms,
        floors: formData.floors
      };
      
      console.log("Generating UK-compliant AI quote for:", { jobType, propertyDetails });
      
      // Enhanced prompt for UK electrical work
      const { data, error } = await supabase.functions.invoke('ai-quote-generator', {
        body: { 
          jobType, 
          propertyDetails,
          clientRequirements: formData.additionalRequirements,
          region: "UK",
          standards: ["BS 7671", "Part P Building Regulations"],
          currency: "GBP"
        }
      });
      
      if (error) {
        console.error("AI generation error:", error);
        handleLocalGeneration();
        return;
      }
      
      if (data?.quote) {
        const aiQuote = data.quote;
        console.log("Processing UK AI quote:", aiQuote);
        
        // Process AI-generated materials with UK specifications
        let updatedMaterials = [...materials];
        
        if (aiQuote.materials && Array.isArray(aiQuote.materials)) {
          updatedMaterials = aiQuote.materials.map((item: any, index: number) => ({
            id: index + 1,
            description: item.description || item.name || "Electrical Component",
            quantity: Math.max(1, parseInt(item.quantity) || 1),
            unitPrice: Math.max(0, parseFloat(item.unitPrice || item.price || item.cost) || 0)
          }));
          setMaterials(updatedMaterials);
        }
        
        // Enhanced labour calculation for UK market
        let labourInfo = {
          days: calculateLabourDays(jobType, formData.bedrooms),
          rate: 280, // Updated UK electrician daily rate
          total: 0
        };
        
        if (aiQuote.labour) {
          labourInfo.days = Math.max(0.5, parseFloat(aiQuote.labour.days) || labourInfo.days);
          labourInfo.rate = Math.max(200, parseFloat(aiQuote.labour.dailyRate || aiQuote.labour.rate) || labourInfo.rate);
        }
        labourInfo.total = Math.round(labourInfo.days * labourInfo.rate);
        
        // UK VAT calculation (20%)
        const materialCost = updatedMaterials.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        const subtotal = materialCost + labourInfo.total;
        const vat = Math.round(subtotal * 0.2);
        const total = subtotal + vat;
        
        console.log("UK quote financials:", { materialCost, labourCost: labourInfo.total, subtotal, vat, total });
        
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
            scopeOfWork: formData.scopeOfWork || 
              (aiQuote.scopeOfWork || generateDefaultScopeOfWork(jobType, formData)),
            additionalRequirements: formData.additionalRequirements
          },
          materials: updatedMaterials,
          labour: labourInfo,
          financials: {
            materialCost: Math.round(materialCost),
            labourCost: labourInfo.total,
            subtotal: Math.round(subtotal),
            vat,
            total
          },
          quoteNumber: `QT-${Date.now().toString().substring(7)}`,
          issueDate: new Date().toLocaleDateString('en-GB'),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')
        };
        
        setIsLoading(false);
        onGenerateQuote(quoteData);
        
        toast({
          title: "AI Quote Generated Successfully",
          description: `Professional quote created with ${updatedMaterials.length} materials totalling £${total.toLocaleString('en-GB')}.`,
        });
      } else {
        console.log("AI response incomplete, using local generation");
        handleLocalGeneration();
      }
    } catch (error) {
      console.error("Quote generation error:", error);
      handleLocalGeneration();
    }
  };
  
  // Enhanced local generation with UK standards
  const handleLocalGeneration = () => {
    console.log("Generating local UK-compliant quote");
    
    const materialCost = materials.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const labourDays = calculateLabourDays(jobType, formData.bedrooms);
    const labourRate = 280; // UK electrician daily rate
    const labourCost = Math.round(labourDays * labourRate);
    const subtotal = materialCost + labourCost;
    const vat = Math.round(subtotal * 0.2); // UK VAT rate
    const total = subtotal + vat;
    
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
        materialCost: Math.round(materialCost),
        labourCost,
        subtotal: Math.round(subtotal),
        vat,
        total
      },
      quoteNumber: `QT-${Date.now().toString().substring(7)}`,
      issueDate: new Date().toLocaleDateString('en-GB'),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')
    };
    
    setIsLoading(false);
    onGenerateQuote(quoteData);
    
    toast({
      title: "Quote Generated",
      description: `Professional quote created totalling £${total.toLocaleString('en-GB')}.`,
    });
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
