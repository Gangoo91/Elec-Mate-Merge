/**
 * PHASE 2: Circuit-Specific RAG Filtering
 * Dramatically reduces token count by sending ONLY relevant regulations
 */

// Map circuit types to ONLY relevant regulations
export const CIRCUIT_REGULATION_FILTERS: Record<string, {
  required_regulations: string[];
  required_design_topics: string[];
  exclude_topics: string[];
}> = {
  socket: {
    required_regulations: [
      'Appendix 4', 'Table 54.7', 'Appendix 15', // Calculations
      '433.1.204', '411.3.3', // Ring finals, RCD
      '522.6', '543.1.1' // Wiring, earthing
    ],
    required_design_topics: [
      'ring final calculation', 'socket diversity', 'rcd protection'
    ],
    exclude_topics: ['shower', 'cooker', 'ev charger', 'motor']
  },
  
  sockets: { // Alias for 'socket'
    required_regulations: [
      'Appendix 4', 'Table 54.7', 'Appendix 15',
      '433.1.204', '411.3.3',
      '522.6', '543.1.1'
    ],
    required_design_topics: [
      'ring final calculation', 'socket diversity', 'rcd protection'
    ],
    exclude_topics: ['shower', 'cooker', 'ev charger', 'motor']
  },
  
  shower: {
    required_regulations: [
      'Appendix 4', 'Table 54.7', // Calculations
      '701.411.3.3', '701.512.2', // Bathroom zones, RCD
      '433.1.1', '522.8' // Cable sizing, buried cables
    ],
    required_design_topics: [
      'high load circuits', 'shower circuit design', 'bathroom zones'
    ],
    exclude_topics: ['ring final', 'socket diversity']
  },
  
  lighting: {
    required_regulations: [
      'Appendix 4', 'Table 54.7', // Calculations (3% limit)
      '525.1', '411.3.2', // Voltage drop, protection
      '559.6' // Luminaires
    ],
    required_design_topics: [
      'lighting circuits', 'voltage drop 3%', 'switch drop'
    ],
    exclude_topics: ['high load', 'rcd socket', 'diversity']
  },
  
  cooker: {
    required_regulations: [
      'Appendix 4', 'Table 54.7', // Calculations
      '433.1.1', '553.1.5', // Cable sizing, cooking appliances
      '476' // Isolation
    ],
    required_design_topics: [
      'cooker circuit', 'cooking appliance', 'diversity'
    ],
    exclude_topics: ['ring final', 'socket']
  },
  
  ev_charger: {
    required_regulations: [
      'Appendix 4', 'Table 54.7', // Calculations
      '722.', '411.3.3', // EV charging, RCD Type A/B
      '522.8', '543.1' // Outdoor cables, earthing
    ],
    required_design_topics: [
      'ev charger', 'electric vehicle', 'type b rcd', 'outdoor'
    ],
    exclude_topics: ['ring final', 'lighting', 'socket diversity']
  },

  heating: {
    required_regulations: [
      'Appendix 4', 'Table 54.7',
      '433.1.1', '554.1' // Cable sizing, heating
    ],
    required_design_topics: [
      'heating circuit', 'fixed heating'
    ],
    exclude_topics: ['ring final', 'socket diversity']
  },

  immersion: {
    required_regulations: [
      'Appendix 4', 'Table 54.7',
      '433.1.1', '554.3' // Cable sizing, water heaters
    ],
    required_design_topics: [
      'immersion heater', 'water heating'
    ],
    exclude_topics: ['ring final', 'socket diversity']
  }
};

/**
 * Filter regulations to ONLY those relevant for a specific circuit type
 * CRITICAL: This is what prevents sending 18 regulations when only 8 are needed
 */
export function filterRegulationsForCircuit(
  allRegulations: any[],
  circuitType: string
): any[] {
  const filter = CIRCUIT_REGULATION_FILTERS[circuitType.toLowerCase()] || 
                 CIRCUIT_REGULATION_FILTERS.socket; // Default fallback
  
  return allRegulations.filter(reg => {
    const regNum = (reg.regulation_number || '').toLowerCase();
    const content = (reg.content || '').toLowerCase();
    const topic = (reg.topic || '').toLowerCase();
    
    // Include if matches required regulations
    const isRequired = filter.required_regulations.some(req =>
      regNum.includes(req.toLowerCase()) || content.includes(req.toLowerCase())
    );
    
    // Include if matches required design topics
    const hasRequiredTopic = filter.required_design_topics.some(topicReq =>
      topic.includes(topicReq) || content.includes(topicReq)
    );
    
    // Exclude if matches excluded topics (prevents bleeding between circuit types)
    const isExcluded = filter.exclude_topics.some(exclude =>
      topic.includes(exclude) || content.includes(exclude)
    );
    
    return (isRequired || hasRequiredTopic) && !isExcluded;
  });
}
