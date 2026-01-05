export interface InspectionPhoto {
  id: string;
  itemId: string;
  url: string;
  thumbnailUrl: string;
  uploadedAt: Date;
  faultCode?: 'C1' | 'C2' | 'C3' | 'FI' | 'limitation' | 'not-applicable';
  observationId?: string;
  faultDescription?: string;
  aiAnalysis?: {
    aiClassification: 'C1' | 'C2' | 'C3' | 'NO_DEFECT_VISIBLE' | 'PHOTO_UNCLEAR';
    confidence: number;
    qualityAssurance: {
      agreesWithInspector: boolean;
      feedback: string;
      suggestedClassification?: 'C1' | 'C2' | 'C3' | 'FI';
      reasonForChallenge?: string;
    };
    regulations: Array<{
      code: string;
      title?: string;
      requirement: string;
      assessment: string;
    }>;
    observations: {
      visibleInPhoto?: string[];
      safetyFeatures?: string[];
      concerns?: string[];
      cannotVerify?: string[];
    };
    inspectorGuidance: {
      message: string;
      additionalChecks?: string[];
      needsMoreInfo?: boolean;
      questionsToConsider?: string[];
    };
    photoQuality: {
      adequate: boolean;
      issues?: string[];
    };
  };
}

export interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'limitation' | 'not-verified' | '';
  notes?: string;
  photos?: InspectionPhoto[];
}
