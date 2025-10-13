/**
 * Query Decomposer - Multi-Stage Query Understanding
 * Decomposes complex queries into atomic searchable units
 */

import { parseQueryEntities, ParsedEntities } from './query-parser.ts';
import { classifyQuery, QueryType } from './query-parser.ts';

export interface QueryComponents {
  primary: {
    type: QueryType;
    entities: ParsedEntities;
  };
  secondary: Array<{
    type: 'location' | 'safety' | 'installation' | 'compliance';
    keywords: string[];
    priority: number; // 1-10
  }>;
  implicit: {
    regulations: string[];
    standards: string[];
    tables: string[];
  };
}

/**
 * Decompose a complex query into atomic searchable components
 */
export function decomposeQuery(query: string): QueryComponents {
  const entities = parseQueryEntities(query);
  const queryType = classifyQuery(query, entities);
  
  // Extract implicit requirements based on context
  const implicit = extractImplicitRequirements(query, entities);
  
  // Identify secondary concerns
  const secondary = identifySecondaryConcerns(query, entities);
  
  return {
    primary: { type: queryType, entities },
    secondary,
    implicit
  };
}

/**
 * Extract implicit regulation requirements based on query context
 */
function extractImplicitRequirements(
  query: string, 
  entities: ParsedEntities
): { regulations: string[]; standards: string[]; tables: string[] } {
  const implicit = {
    regulations: [] as string[],
    standards: [] as string[],
    tables: [] as string[]
  };
  
  // High-power loads → Diversity factors
  if (entities.power && entities.power > 8000) {
    implicit.regulations.push('433.1.1', '311.1');
    implicit.standards.push('Appendix 1'); // Diversity
  }
  
  // Bathroom location → Section 701 mandatory
  if (entities.location === 'bathroom') {
    implicit.standards.push('Section 701');
    implicit.regulations.push('701.410.3.5', '701.512.3');
    implicit.tables.push('Table 70.1'); // IP ratings
  }
  
  // EV charger → Section 722
  if (entities.loadType === 'ev_charger') {
    implicit.standards.push('Section 722');
    implicit.regulations.push('722.55.101', '722.531.2.101');
  }
  
  // Outdoor → buried cable requirements
  if (entities.location === 'outdoor') {
    implicit.regulations.push('522.8.10', '522.6.101');
    implicit.tables.push('Table 4D4A'); // SWA cables
  }
  
  // TT system → RCD mandatory
  if (entities.earthingSystem === 'TT') {
    implicit.regulations.push('411.5.2', '411.3.3');
  }
  
  return implicit;
}

/**
 * Identify secondary concerns for multi-vector search
 */
function identifySecondaryConcerns(
  query: string,
  entities: ParsedEntities
): Array<{ type: 'location' | 'safety' | 'installation' | 'compliance'; keywords: string[]; priority: number }> {
  const concerns: Array<{ type: 'location' | 'safety' | 'installation' | 'compliance'; keywords: string[]; priority: number }> = [];
  
  // Location-based safety
  if (entities.location) {
    concerns.push({
      type: 'safety',
      keywords: [entities.location, 'protection', 'IP rating', 'zones'],
      priority: 9
    });
  }
  
  // Installation method constraints
  if (entities.installationConstraints && entities.installationConstraints.length > 0) {
    concerns.push({
      type: 'installation',
      keywords: ['install method', 'cable routing', 'derating'],
      priority: 7
    });
  }
  
  // Special requirements
  if (entities.specialRequirements && entities.specialRequirements.length > 0) {
    concerns.push({
      type: 'compliance',
      keywords: ['RCD', 'bonding', 'supplementary protection'],
      priority: 8
    });
  }
  
  return concerns.sort((a, b) => b.priority - a.priority);
}
