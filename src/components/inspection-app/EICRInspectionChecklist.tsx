
import React from 'react';
import { bs7671InspectionSections } from '@/data/bs7671ChecklistData';
import { filterInspectionSections } from '@/utils/inspectionFiltering';
import InspectionStatsSummary from './InspectionStatsSummary';
import InspectionChecklistCard from './InspectionChecklistCard';
import DefectCodesReference from './DefectCodesReference';
import DefectObservationsSection from './DefectObservationsSection';
import OverallAssessmentCard from './OverallAssessmentCard';
import { supabase } from '@/integrations/supabase/client';
import { useEICRForm } from './eicr/EICRFormProvider';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface EICRInspectionChecklistProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onNavigateToObservations?: () => void;
}

const EICRInspectionChecklist = ({ formData, onUpdate, onNavigateToObservations }: EICRInspectionChecklistProps) => {
  const { effectiveReportId } = useEICRForm();
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
  const observationsRef = React.useRef<HTMLDivElement>(null);

  const getInspectionItems = (): InspectionItem[] => {
    // Always show all sections for EICR forms
    const filteredSections = bs7671InspectionSections;
    
    // Always ensure we have the correct number of items from the filtered structure
    const expectedItems = filteredSections.flatMap(section =>
      section.items.map(item => ({
        id: item.id,
        section: section.title,
        item: item.item,
        clause: item.clause,
        inspected: false,
        outcome: '' as const, // Default to empty string instead of 'not-applicable'
        notes: ''
      }))
    );

    // If we have existing form data, merge it with the expected structure
    if (formData.inspectionItems && formData.inspectionItems.length > 0) {
      const existingItemsMap = new Map(
        formData.inspectionItems.map((item: InspectionItem) => [item.id, item])
      );
      
      return expectedItems.map(expectedItem => {
        const existingItem = existingItemsMap.get(expectedItem.id) as InspectionItem | undefined;
        return existingItem ? {
          ...expectedItem,
          ...existingItem,
          // Ensure outcome is valid
          outcome: existingItem.outcome || ('' as const)
        } : expectedItem;
      });
    }
    
    return expectedItems;
  };

  const getDefectObservations = (): DefectObservation[] => {
    return formData.defectObservations || [];
  };

  const updateInspectionItem = (id: string, field: keyof InspectionItem | '__BULK_UPDATE__', value: any) => {
      id,
      field,
      value,
      timestamp: new Date().toISOString()
    });
    
    // Handle bulk update for atomic operations
    if (id === '__BULK_UPDATE__' && field === '__BULK_UPDATE__') {
      onUpdate('inspectionItems', value);
      return;
    }
    
    const items = getInspectionItems();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      console.warn(`[EICRInspectionChecklist] Item ${id} not found. Available items:`, items.map(i => i.id).slice(0, 10));
      // Force re-initialization if item not found
      const initializedItems = getInspectionItems();
      onUpdate('inspectionItems', initializedItems);
      return;
    }
    
    const currentItem = items[itemIndex];
    
    // Create updated items array with atomic updates
    const updatedItems = [...items];
    const updates: Partial<InspectionItem> = { [field as keyof InspectionItem]: value };
    
    // If updating outcome, also update inspected status appropriately
    if (field === 'outcome') {
      updates.inspected = value !== '' && value !== 'not-applicable';
    }
    
    updatedItems[itemIndex] = { ...currentItem, ...updates };
    
    const updatedItem = updatedItems[itemIndex];
    
    // Update the form data with all changes at once
    onUpdate('inspectionItems', updatedItems);
    
    // If updating notes and there's a linked observation with a critical outcome, sync notes to observation
    if (field === 'notes' && (currentItem.outcome === 'C1' || currentItem.outcome === 'C2' || currentItem.outcome === 'C3')) {
      const existingObservations = getDefectObservations();
      const linkedObservation = existingObservations.find(obs => obs.inspectionItemId === id);
      
      if (linkedObservation && value && value.trim()) {
        const updatedObservations = existingObservations.map(obs =>
          obs.id === linkedObservation.id 
            ? { ...obs, description: value }
            : obs
        );
        onUpdate('defectObservations', updatedObservations);
      }
    }
  };

  const autoCreateObservation = async (inspectionItem: InspectionItem) => {
    
    const existingObservations = getDefectObservations();
    
    // Don't create observations for N/A, satisfactory, or other non-defect outcomes
    if (!['C1', 'C2', 'C3'].includes(inspectionItem.outcome)) {
      
      // If there's an existing observation linked to this item, remove it
      const linkedObservation = existingObservations.find(obs => obs.inspectionItemId === inspectionItem.id);
      if (linkedObservation) {
        const updatedObservations = existingObservations.filter(obs => obs.id !== linkedObservation.id);
        onUpdate('defectObservations', updatedObservations);
      }
      
      return;
    }
    
    const existingObservation = existingObservations.find(obs => obs.inspectionItemId === inspectionItem.id);
    
    // Use notes from inspection item if available
    const description = inspectionItem.notes && inspectionItem.notes.trim() 
      ? inspectionItem.notes 
      : 'Item requires attention - inspection outcome not satisfactory';
    
    let observationId: string;
    
    if (existingObservation) {
      observationId = existingObservation.id;
      const updatedObservations = existingObservations.map(obs =>
        obs.id === existingObservation.id 
          ? { 
              ...obs, 
              defectCode: inspectionItem.outcome as 'C1' | 'C2' | 'C3',
              item: inspectionItem.item,
              description: description  // Update description with notes
            }
          : obs
      );
      onUpdate('defectObservations', updatedObservations);
    } else {
      observationId = Date.now().toString();
      const newObservation: DefectObservation = {
        id: observationId,
        item: inspectionItem.item,
        defectCode: inspectionItem.outcome as 'C1' | 'C2' | 'C3',
        description: description,  // Use notes as description
        recommendation: 'Investigate and rectify as required to comply with BS 7671',
        rectified: false,
        inspectionItemId: inspectionItem.id
      };
      onUpdate('defectObservations', [...existingObservations, newObservation]);
    }

    // Link all photos from this inspection item to the observation
    if (effectiveReportId) {
      try {
        const { error } = await supabase
          .from('inspection_photos')
          .update({ observation_id: observationId })
          .eq('report_id', effectiveReportId)
          .eq('item_id', inspectionItem.id)
          .is('observation_id', null); // Only update photos not already linked

        if (error) {
        } else {
        }
      } catch (error) {
      }
    }
  };

  const handleNavigateToObservations = () => {
    setTimeout(() => {
      if (observationsRef.current) {
        observationsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (onNavigateToObservations) {
        onNavigateToObservations();
      }
    }, 100);
  };

  const addDefectObservation = () => {
    const newObservation: DefectObservation = {
      id: Date.now().toString(),
      item: '',
      defectCode: 'C3',
      description: '',
      recommendation: '',
      rectified: false
    };
    const observations = getDefectObservations();
    onUpdate('defectObservations', [...observations, newObservation]);
  };

  const updateDefectObservation = (id: string, field: keyof DefectObservation, value: any) => {
    const observations = getDefectObservations();
    const updatedObservations = observations.map(obs =>
      obs.id === id ? { ...obs, [field]: value } : obs
    );
    onUpdate('defectObservations', updatedObservations);
  };

  const removeDefectObservation = (id: string) => {
    const observations = getDefectObservations();
    const updatedObservations = observations.filter(obs => obs.id !== id);
    onUpdate('defectObservations', updatedObservations);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const bulkMarkSatisfactory = (sectionId: string) => {
    
    const items = getInspectionItems();
    const section = bs7671InspectionSections.find(s => s.id === sectionId);
    
    if (!section) {
      console.warn(`[EICRInspectionChecklist] Section ${sectionId} not found`);
      return;
    }

    const updatedItems = items.map(item => {
      const isInSection = section.items.some(sItem => sItem.id === item.id);
      if (isInSection) {
        return {
          ...item,
          outcome: 'satisfactory' as const,
          inspected: true
        };
      }
      return item;
    });

    const sectionItemsCount = section.items.length;
    onUpdate('inspectionItems', updatedItems);
  };

  const bulkClearSection = (sectionId: string) => {
    
    const items = getInspectionItems();
    const section = bs7671InspectionSections.find(s => s.id === sectionId);
    
    if (!section) {
      console.warn(`[EICRInspectionChecklist] Section ${sectionId} not found`);
      return;
    }

    const updatedItems = items.map(item => {
      const isInSection = section.items.some(sItem => sItem.id === item.id);
      if (isInSection) {
        return {
          ...item,
          outcome: '' as const, // Clear to empty string
          inspected: false,
          notes: ''
        };
      }
      return item;
    });

    const sectionItemsCount = section.items.length;
    onUpdate('inspectionItems', updatedItems);
  };

  // Initialize inspection items if not already present or if count mismatch
  React.useEffect(() => {
    const expectedCount = bs7671InspectionSections.reduce((total, section) => total + section.items.length, 0);
    const currentCount = formData.inspectionItems?.length || 0;
    
    if (currentCount !== expectedCount) {
      const initialItems = getInspectionItems();
        totalItems: initialItems.length,
        sampleItems: initialItems.slice(0, 3)
      });
      onUpdate('inspectionItems', initialItems);
    }
  }, []);

  const inspectionItems = getInspectionItems();
  const defectObservations = getDefectObservations();

    itemsCount: inspectionItems.length,
    firstFewItems: inspectionItems.slice(0, 3),
    formDataItemsCount: formData.inspectionItems?.length || 0,
    timestamp: new Date().toISOString()
  });

  return (
    <div className="md:max-w-6xl mx-auto space-y-3 sm:space-y-6 pb-20 lg:pb-4 relative">
      
      <InspectionStatsSummary inspectionItems={inspectionItems} />
      
      <InspectionChecklistCard
        inspectionItems={inspectionItems}
        expandedSections={expandedSections}
        onToggleSection={toggleSection}
        onUpdateItem={updateInspectionItem}
        onNavigateToObservations={handleNavigateToObservations}
        onAutoCreateObservation={autoCreateObservation}
        onBulkMarkSatisfactory={bulkMarkSatisfactory}
        onBulkClearSection={bulkClearSection}
      />

      <DefectCodesReference />

      <DefectObservationsSection
        ref={observationsRef}
        defectObservations={defectObservations}
        reportId={effectiveReportId}
        onAddObservation={addDefectObservation}
        onUpdateObservation={updateDefectObservation}
        onRemoveObservation={removeDefectObservation}
      />

      <OverallAssessmentCard formData={formData} onUpdate={onUpdate} />
    </div>
  );
};

export default EICRInspectionChecklist;
