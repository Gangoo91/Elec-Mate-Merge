
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
    if (!formData.clientName || !jobType) {
      toast({
        title: "Missing information",
        description: "Please provide client name and select a job type.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First, try to use the AI Edge Function if available
      try {
        const propertyDetails = {
          type: formData.propertyType,
          bedrooms: formData.bedrooms,
          floors: formData.floors
        };
        
        console.log("Sending request to AI quote generator with:", { jobType, propertyDetails, clientRequirements: formData.additionalRequirements });
        
        // Call the Supabase Edge Function for AI generation
        const { data, error } = await supabase.functions.invoke('ai-quote-generator', {
          body: { 
            jobType, 
            propertyDetails,
            clientRequirements: formData.additionalRequirements
          }
        });
        
        if (error) {
          console.error("Edge function error:", error);
          // Fallback to local generation if the AI function fails
          handleLocalGeneration();
          return;
        }
        
        console.log("AI quote response:", data);
        
        if (data && data.quote) {
          // Use the AI generated content to enhance our quote
          const aiQuote = data.quote;
          console.log("Processing AI quote data:", aiQuote);
          
          // Extract materials from AI response if available
          let updatedMaterials = [...materials];
          
          if (aiQuote.materials && Array.isArray(aiQuote.materials)) {
            console.log("Using AI-generated materials:", aiQuote.materials);
            updatedMaterials = aiQuote.materials.map((item: any, index: number) => ({
              id: index + 1,
              description: item.description || item.name || item.item || "Unknown Item",
              quantity: parseInt(item.quantity) || 1,
              unitPrice: parseFloat(item.unitPrice || item.price || item.cost) || 0
            }));
            setMaterials(updatedMaterials);
          }
          
          // Extract labour information from AI response
          let labourInfo = {
            days: calculateLabourDays(jobType, formData.bedrooms),
            rate: 250,
            total: 0
          };
          
          if (aiQuote.labour) {
            labourInfo.days = parseFloat(aiQuote.labour.days) || labourInfo.days;
            labourInfo.rate = parseFloat(aiQuote.labour.dailyRate || aiQuote.labour.rate) || labourInfo.rate;
          }
          labourInfo.total = labourInfo.days * labourInfo.rate;
          
          console.log("Labour info:", labourInfo);
          
          // Calculate financials using AI data
          const materialCost = updatedMaterials.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
          const subtotal = materialCost + labourInfo.total;
          const vat = subtotal * 0.2;
          const total = subtotal + vat;
          
          console.log("Calculated financials:", { materialCost, labourCost: labourInfo.total, subtotal, vat, total });
          
          // Generate the quote data with AI enhancements
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
                (aiQuote.scopeOfWork ? aiQuote.scopeOfWork : generateDefaultScopeOfWork(jobType, formData)),
              additionalRequirements: formData.additionalRequirements
            },
            materials: updatedMaterials,
            labour: labourInfo,
            financials: {
              materialCost,
              labourCost: labourInfo.total,
              subtotal,
              vat,
              total
            },
            quoteNumber: `QT-${Date.now().toString().substring(7)}`,
            issueDate: new Date().toISOString().split('T')[0],
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          };
          
          console.log("Final quote data:", quoteData);
          
          setIsLoading(false);
          onGenerateQuote(quoteData);
          toast({
            title: "AI Quote Generated",
            description: `Quote generated with ${updatedMaterials.length} materials and ${labourInfo.days} days labour at £${total.toFixed(2)} total.`
          });
        } else {
          console.log("No quote data from AI, falling back to local generation");
          // Fallback to local generation if AI doesn't return expected format
          handleLocalGeneration();
        }
      } catch (error) {
        console.error("Error using AI quote generator:", error);
        // Fallback to local generation
        handleLocalGeneration();
      }
    } catch (error) {
      console.error("Error generating quote:", error);
      setIsLoading(false);
      toast({
        title: "Error generating quote",
        description: "There was a problem generating your quote. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Fallback to local quote generation if AI fails
  const handleLocalGeneration = () => {
    console.log("Using local generation with current materials:", materials);
    
    // Calculate material costs
    const materialCost = materials.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    // Calculate appropriate labour cost based on job type and inputs
    const labourDays = calculateLabourDays(jobType, formData.bedrooms);
    const labourRate = 250; // Daily rate in £
    const labourCost = labourDays * labourRate;
    const subtotal = materialCost + labourCost;
    const vat = subtotal * 0.2;
    const total = subtotal + vat;
    
    console.log("Local generation financials:", { materialCost, labourCost, subtotal, vat, total });
    
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
    
    toast({
      title: "Quote generated",
      description: `Local quote generated at £${total.toFixed(2)} total.`
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
