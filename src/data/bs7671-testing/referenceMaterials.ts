
export interface ReferenceDocument {
  id: string;
  title: string;
  type: "Standard" | "Guide" | "Calculator" | "Database" | "Video" | "Chart" | "Examples";
  category: string;
  description: string;
  url: string;
  isExternal: boolean;
  downloadable: boolean;
  fileSize?: string;
  lastUpdated: string;
  popularity: number;
}

export interface QuickLink {
  name: string;
  url: string;
  description: string;
  category: string;
}

export interface EmergencyContact {
  service: string;
  number: string;
  type: "Emergency" | "Advice" | "Information";
  description: string;
  availability: string;
}

export const referenceMaterials: ReferenceDocument[] = [
  // Official Standards
  {
    id: "bs7671-2018",
    title: "BS 7671:2018+A2:2022",
    type: "Standard",
    category: "Official Standards",
    description: "18th Edition IET Wiring Regulations - Complete standard",
    url: "https://www.theiet.org/bs7671",
    isExternal: true,
    downloadable: false,
    lastUpdated: "2022-03-28",
    popularity: 95
  },
  {
    id: "guidance-note-3",
    title: "IET Guidance Note 3",
    type: "Guide",
    category: "Official Standards",
    description: "Inspection & Testing - Comprehensive guidance document",
    url: "/documents/guidance-note-3.pdf",
    isExternal: false,
    downloadable: true,
    fileSize: "2.1 MB",
    lastUpdated: "2023-01-15",
    popularity: 88
  },
  {
    id: "onsite-guide",
    title: "IET On-Site Guide",
    type: "Guide",
    category: "Official Standards",
    description: "Practical application of BS 7671 for site use",
    url: "/documents/onsite-guide.pdf",
    isExternal: false,
    downloadable: true,
    fileSize: "1.8 MB",
    lastUpdated: "2023-02-10",
    popularity: 92
  },

  // Online Tools
  {
    id: "cable-calc",
    title: "Cable Calculation Tool",
    type: "Calculator",
    category: "Online Tools",
    description: "Calculate cable sizes, current carrying capacity and volt drop",
    url: "/apprentice/on-job-tools/calculators",
    isExternal: false,
    downloadable: false,
    lastUpdated: "2024-01-10",
    popularity: 85
  },
  {
    id: "zs-database",
    title: "Zs Values Database",
    type: "Database",
    category: "Online Tools",
    description: "Maximum Zs values for all types of protective devices",
    url: "/documents/zs-values-database.xlsx",
    isExternal: false,
    downloadable: true,
    fileSize: "456 KB",
    lastUpdated: "2023-12-15",
    popularity: 79
  },
  {
    id: "rcd-calculator",
    title: "RCD Trip Time Calculator",
    type: "Calculator",
    category: "Online Tools",
    description: "Calculate expected RCD operating times and verify test results",
    url: "/apprentice/on-job-tools/calculators",
    isExternal: false,
    downloadable: false,
    lastUpdated: "2024-01-05",
    popularity: 72
  },

  // Video Tutorials
  {
    id: "safe-isolation-video",
    title: "Safe Isolation Procedures",
    type: "Video",
    category: "Video Tutorials",
    description: "Complete step-by-step safe isolation process demonstration",
    url: "https://www.youtube.com/watch?v=safety-isolation",
    isExternal: true,
    downloadable: false,
    lastUpdated: "2023-11-20",
    popularity: 90
  },
  {
    id: "mft-testing-video",
    title: "MFT Testing Techniques",
    type: "Video",
    category: "Video Tutorials",
    description: "Proper use of multifunction testers for all BS 7671 tests",
    url: "https://www.youtube.com/watch?v=mft-testing",
    isExternal: true,
    downloadable: false,
    lastUpdated: "2023-10-15",
    popularity: 84
  },
  {
    id: "eicr-practices-video",
    title: "EICR Best Practices",
    type: "Video",
    category: "Video Tutorials",
    description: "Professional electrical installation condition report techniques",
    url: "https://www.youtube.com/watch?v=eicr-practices",
    isExternal: true,
    downloadable: false,
    lastUpdated: "2023-09-25",
    popularity: 81
  },

  // Reference Materials
  {
    id: "testing-flowchart",
    title: "Testing Sequence Flowchart",
    type: "Chart",
    category: "Reference Materials",
    description: "Visual guide to BS 7671 testing order and procedures",
    url: "/documents/testing-sequence-flowchart.pdf",
    isExternal: false,
    downloadable: true,
    fileSize: "892 KB",
    lastUpdated: "2023-12-01",
    popularity: 87
  },
  {
    id: "defects-guide",
    title: "Common Defects Guide",
    type: "Guide",
    category: "Reference Materials",
    description: "Identification and classification of electrical installation defects",
    url: "/documents/common-defects-guide.pdf",
    isExternal: false,
    downloadable: true,
    fileSize: "1.2 MB",
    lastUpdated: "2023-11-10",
    popularity: 76
  },
  {
    id: "certificate-examples",
    title: "Certificate Examples",
    type: "Examples",
    category: "Reference Materials",
    description: "Properly completed certificates for various installation types",
    url: "/documents/certificate-examples.pdf",
    isExternal: false,
    downloadable: true,
    fileSize: "2.8 MB",
    lastUpdated: "2023-10-20",
    popularity: 83
  }
];

export const quickLinks: QuickLink[] = [
  {
    name: "IET Website",
    url: "https://www.theiet.org",
    description: "Institution of Engineering and Technology official website",
    category: "Professional Bodies"
  },
  {
    name: "NICEIC Guidance",
    url: "https://www.niceic.com",
    description: "Technical guidance and industry updates from NICEIC",
    category: "Certification Bodies"
  },
  {
    name: "NAPIT Resources",
    url: "https://www.napit.org.uk",
    description: "Technical resources and training materials from NAPIT",
    category: "Certification Bodies"
  },
  {
    name: "Building Regulations",
    url: "https://www.gov.uk/building-regulations-approval",
    description: "Government guidance on building regulations Part P",
    category: "Regulations"
  }
];

export const emergencyContacts: EmergencyContact[] = [
  {
    service: "HSE Incident Reporting",
    number: "0845 300 9923",
    type: "Emergency",
    description: "Report serious workplace accidents and incidents",
    availability: "24 hours"
  },
  {
    service: "Electrical Safety First",
    number: "020 3463 5100",
    type: "Advice",
    description: "Electrical safety advice and guidance",
    availability: "Monday-Friday 9am-5pm"
  },
  {
    service: "DNO Emergency",
    number: "105",
    type: "Emergency",
    description: "Power cuts and electrical emergencies on the network",
    availability: "24 hours"
  }
];

export const getReferencesByCategory = (category: string): ReferenceDocument[] => {
  return referenceMaterials.filter(doc => doc.category === category);
};

export const getPopularReferences = (limit: number = 5): ReferenceDocument[] => {
  return referenceMaterials
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const searchReferences = (query: string): ReferenceDocument[] => {
  const searchTerm = query.toLowerCase();
  return referenceMaterials.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm) ||
    doc.description.toLowerCase().includes(searchTerm) ||
    doc.category.toLowerCase().includes(searchTerm)
  );
};
