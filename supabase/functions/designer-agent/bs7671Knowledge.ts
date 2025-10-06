// Phase 2: RAG Knowledge - BS 7671 Regulations Database

export interface BS7671Regulation {
  number: string;
  section: string;
  content: string;
  amendment?: string;
}

// Critical BS 7671 regulations for circuit design
export const bs7671Regulations: BS7671Regulation[] = [
  {
    number: "411.3.2",
    section: "Automatic disconnection of supply - TN systems",
    content: "For final circuits not exceeding 32A, disconnection time must not exceed 0.4s. Max Zs values are specified in Tables 41.2, 41.3, 41.4, and 41.6.",
    amendment: "A3:2024"
  },
  {
    number: "433.1",
    section: "Overload protection",
    content: "Every circuit shall be designed so that overload current in conductors does not cause temperature to exceed permissible limit. Protective device rated current In must satisfy: Ib ≤ In ≤ Iz where Ib is design current and Iz is current-carrying capacity.",
    amendment: "A3:2024"
  },
  {
    number: "433.1.204",
    section: "Cable current-carrying capacity",
    content: "Cable current-carrying capacity (Iz) shall be not less than the rated current of the protective device (In).",
    amendment: "A3:2024"
  },
  {
    number: "525",
    section: "Voltage drop in consumers' installations",
    content: "Voltage drop between origin of installation and any fixed current-using equipment shall not exceed 3% for lighting, 5% for other uses. Based on nominal voltage and design current of the circuit.",
    amendment: "A3:2024"
  },
  {
    number: "411.3.3",
    section: "Additional protection by RCD",
    content: "Socket-outlets rated ≤ 20A for use by ordinary persons and intended for general use shall have additional protection by 30mA RCD. Applies to mobile equipment outdoors.",
    amendment: "A3:2024"
  },
  {
    number: "701.411.3.3",
    section: "Bathrooms - Additional protection",
    content: "All circuits in locations containing a bath or shower shall be protected by 30mA RCD.",
    amendment: "A3:2024"
  },
  {
    number: "522.6.6",
    section: "Cables concealed in walls",
    content: "Where cables are concealed in walls or partitions at depth < 50mm, cable shall incorporate earthed metallic covering OR be protected by 30mA RCD OR installed in safe zones.",
    amendment: "A3:2024"
  },
  {
    number: "314.1",
    section: "Isolation and switching",
    content: "Every installation shall be capable of being isolated from each source of supply. Means of isolation shall cut off all live conductors.",
    amendment: "A3:2024"
  },
  {
    number: "537.2",
    section: "Devices for isolation",
    content: "Devices for isolation shall disconnect all live conductors (line and neutral in single-phase). Isolator shall be designed/installed to prevent unintentional or inadvertent closure.",
    amendment: "A3:2024"
  },
  {
    number: "434.5.2",
    section: "Prospective fault current",
    content: "Breaking capacity of protective device shall be not less than prospective fault current at point of installation. For domestic: typically 6kA minimum, 10kA preferred.",
    amendment: "A3:2024"
  }
];

// Search BS 7671 regulations by topic or number
export function searchBS7671(query: string): BS7671Regulation[] {
  const lowerQuery = query.toLowerCase();
  
  return bs7671Regulations.filter(reg => 
    reg.number.toLowerCase().includes(lowerQuery) ||
    reg.section.toLowerCase().includes(lowerQuery) ||
    reg.content.toLowerCase().includes(lowerQuery)
  );
}

// Get specific regulation by number
export function getRegulation(regNumber: string): BS7671Regulation | null {
  return bs7671Regulations.find(reg => reg.number === regNumber) || null;
}

// Get regulations for specific circuit types
export function getRegulationsForCircuitType(circuitType: string): BS7671Regulation[] {
  const circuitTypeMap: Record<string, string[]> = {
    'shower': ['433.1', '525', '411.3.2', '411.3.3'],
    'cooker': ['433.1', '525', '411.3.2'],
    'socket': ['433.1', '411.3.3', '522.6.6'],
    'lighting': ['433.1', '525', '522.6.6'],
    'bathroom': ['701.411.3.3', '411.3.3'],
  };

  const relevantRegNumbers = circuitTypeMap[circuitType.toLowerCase()] || ['433.1', '525', '411.3.2'];
  
  return bs7671Regulations.filter(reg => relevantRegNumbers.includes(reg.number));
}
