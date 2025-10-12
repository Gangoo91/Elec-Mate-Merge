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
  // Transform circuits to ensure cableSpec is present (fallback to cableSize)
  const transformedCircuits = (data.circuits || []).map(circuit => ({
    ...circuit,
    cableSpec: circuit.cableSpec || `${circuit.cableSize} cable`,
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
