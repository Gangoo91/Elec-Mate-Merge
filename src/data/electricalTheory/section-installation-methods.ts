
import { SectionData } from '../courseTypes';

export const installationMethodsSection: SectionData = {
  sectionNumber: "5A",
  title: "Installation Methods",
  description: "Understanding proper methods for electrical installations",
  content: {
    introduction: "This section covers the key installation methods and techniques for electrical systems.",
    subsections: [
      {
        id: "5A.1",
        title: "Wiring Systems",
        content: "Overview of different wiring systems and their applications",
        keyPoints: ["PVC insulated cables", "Mineral insulated cables", "Steel wire armored cables"]
      },
      {
        id: "5A.2",
        title: "Conduit Systems",
        content: "Installation and selection of conduit systems",
        keyPoints: ["Metal conduit", "PVC conduit", "Flexible conduit"]
      },
      {
        id: "5A.3",
        title: "Trunking Systems",
        content: "Application and installation of trunking",
        keyPoints: ["Steel trunking", "PVC trunking", "Accessory selection"]
      }
    ]
  }
};
