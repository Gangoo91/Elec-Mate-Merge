
export interface MaterialItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface QuoteFormData {
  clientName: string;
  clientAddress: string;
  propertyType: string;
  bedrooms: string;
  floors: string;
  scopeOfWork: string;
  additionalRequirements: string;
}

export interface QuoteGeneratorProps {
  onGenerateQuote: (quoteData: any) => void;
  initialJobType?: string;
}

export interface ClientInfoProps {
  formData: QuoteFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isMobile: boolean;
}

export interface JobDetailsProps {
  formData: QuoteFormData;
  jobType: string;
  setJobType: (value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isMobile: boolean;
}

export interface MaterialsListProps {
  materials: MaterialItem[];
  addMaterialItem: () => void;
  removeMaterialItem: (id: number) => void;
  updateMaterialItem: (id: number, field: string, value: string | number) => void;
  isMobile: boolean;
  isLoading: boolean;
  handleGenerateWithAI: () => void;
  formData: QuoteFormData;
  jobType: string;
}
