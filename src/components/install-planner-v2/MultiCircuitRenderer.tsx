import { MultiCircuitResultsDisplay } from "./MultiCircuitResultsDisplay";

interface MultiCircuitRendererProps {
  data: {
    circuits: any[];
    totalLoad?: number;
    totalLoadKW?: number;
    diversityFactor?: number;
    diversifiedLoad?: number;
    consumerUnitRequired?: string;
    costEstimate?: {
      materialsRange?: string;
      labourRange?: string;
      totalRange?: string;
      notes?: string;
    };
  };
  foundRegulations?: any[];
  ragMetadata?: {
    totalRAGCalls: number;
    regulationCount: number;
    searchMethod: string;
    responseTime?: number;
  };
  agentChain?: string[];
}

export const MultiCircuitRenderer = ({ data, foundRegulations, ragMetadata, agentChain }: MultiCircuitRendererProps) => {
  // STEP 1: Deduplicate circuits based on unique identifier
  const deduplicateCircuits = (circuits: any[]) => {
    const seen = new Map<string, any>();
    const duplicates: string[] = [];
    
    circuits.forEach((circuit, index) => {
      const uniqueKey = `${(circuit.name || '').toLowerCase()}_${circuit.circuitNumber || index}_${circuit.loadPower}`;
      
      if (seen.has(uniqueKey)) {
        duplicates.push(circuit.name || circuit.loadType);
      } else {
        seen.set(uniqueKey, circuit);
      }
    });
    
    if (duplicates.length > 0) {
      console.warn('⚠️ Duplicate circuits detected and removed:', duplicates);
    }
    
    return Array.from(seen.values());
  };
  
  // STEP 2: Transform circuits to ensure cableSpec and protection are present
  const deduplicatedCircuits = deduplicateCircuits(data.circuits || []);
  
  const transformedCircuits = deduplicatedCircuits.map((circuit, index) => ({
    ...circuit,
    id: circuit.id || `${circuit.name}-${circuit.circuitNumber || index}`,
    cableSpec: circuit.cableSpec || `${circuit.cableSize} cable`,
    protection: circuit.protection || circuit.mcbRating || 'TBD',
    complianceStatus: circuit.complianceStatus === 'review' ? 'warning' : circuit.complianceStatus || 'pass'
  }));

  return (
    <MultiCircuitResultsDisplay
      circuits={transformedCircuits}
      totalLoad={data.totalLoad || 0}
      totalLoadKW={data.totalLoadKW || 0}
      diversityFactor={data.diversityFactor}
      diversifiedLoad={data.diversifiedLoad || 0}
      consumerUnitRequired={data.consumerUnitRequired || 'TBD'}
      costEstimate={data.costEstimate ? {
        materialsRange: data.costEstimate.materialsRange || 'TBD',
        labourRange: data.costEstimate.labourRange || 'TBD',
        totalRange: data.costEstimate.totalRange || 'TBD',
        notes: data.costEstimate.notes || ''
      } : undefined}
    />
  );
};
