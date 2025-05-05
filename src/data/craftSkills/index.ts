
import type { SectionData } from "@/data/healthAndSafety/types";

// Define craft skills sections
export const craftSkillsContent: SectionData[] = [
  {
    sectionNumber: "1",
    title: "Cable Installation Techniques",
    content: {
      subsections: [
        {
          id: "1.1",
          title: "Cable Types and Selection",
          content: "Learn about the different types of cables used in electrical installations and how to select the appropriate cable for specific applications.",
          keyPoints: [
            "Cable sizing and current ratings",
            "PVC vs. XLPE insulation",
            "Single core vs. multicore cables",
            "Armored cables and their applications"
          ]
        },
        {
          id: "1.2",
          title: "Cable Routing and Support",
          content: "Understand proper techniques for routing cables through different environments and securing them correctly.",
          keyPoints: [
            "Cable tray systems",
            "Conduit installation",
            "Cable clips and fixings",
            "Minimum bending radii"
          ]
        },
        {
          id: "1.3",
          title: "Cable Termination",
          content: "Learn proper methods for terminating different types of cables to ensure safe and reliable connections.",
          keyPoints: [
            "Stripping techniques",
            "Gland selection and installation",
            "Terminal connections",
            "Testing connections"
          ]
        }
      ],
      icon: "cable"
    }
  },
  {
    sectionNumber: "2",
    title: "Wiring Accessories Installation",
    content: {
      subsections: [
        {
          id: "2.1",
          title: "Socket Outlets and Switches",
          content: "Master the techniques for installing common wiring accessories including socket outlets and light switches.",
          keyPoints: [
            "Back box selection and fitting",
            "Proper mounting heights",
            "Circuit connections",
            "Testing procedures"
          ]
        },
        {
          id: "2.2",
          title: "Consumer Units",
          content: "Learn how to safely install and configure consumer units (distribution boards) in domestic and commercial settings.",
          keyPoints: [
            "Layout and positioning",
            "Circuit identification",
            "RCD and RCBO installation",
            "Earth bonding requirements"
          ]
        }
      ],
      icon: "socket"
    }
  },
  {
    sectionNumber: "3",
    title: "Lighting Installation",
    content: {
      subsections: [
        {
          id: "3.1",
          title: "Luminaire Types and Mounting",
          content: "Explore different lighting technologies and their installation requirements.",
          keyPoints: [
            "Recessed vs. surface mounted fittings",
            "LED installation considerations",
            "Emergency lighting requirements",
            "Adjusting and aiming directional lighting"
          ]
        },
        {
          id: "3.2",
          title: "Lighting Controls",
          content: "Learn to install and configure various lighting control systems.",
          keyPoints: [
            "Basic switching arrangements",
            "Dimmer installation",
            "Occupancy sensors",
            "Smart lighting systems"
          ]
        }
      ],
      icon: "bulb"
    }
  },
  {
    sectionNumber: "4",
    title: "Testing and Verification",
    content: {
      subsections: [
        {
          id: "4.1",
          title: "Test Equipment Operation",
          content: "Learn how to safely and effectively use electrical test equipment.",
          keyPoints: [
            "Multimeter usage",
            "Insulation resistance testing",
            "Earth fault loop impedance testing",
            "RCD testing"
          ]
        },
        {
          id: "4.2",
          title: "Test Procedures",
          content: "Understand the sequence and methodology for testing new and existing installations.",
          keyPoints: [
            "Dead testing sequence",
            "Live testing safety precautions",
            "Recording test results",
            "Interpreting readings"
          ]
        }
      ],
      icon: "test"
    }
  },
  {
    sectionNumber: "5",
    title: "Workshop Practical Skills",
    content: {
      subsections: [
        {
          id: "5.1",
          title: "Hand Tools and Equipment",
          content: "Develop practical skills with common electrical installation tools and equipment.",
          keyPoints: [
            "Tool selection for specific tasks",
            "Safe tool usage techniques",
            "Tool maintenance",
            "Power tool safety"
          ]
        },
        {
          id: "5.2",
          title: "Conduit and Trunking",
          content: "Master the techniques for installing metallic and non-metallic conduit and trunking systems.",
          keyPoints: [
            "Measuring and cutting",
            "Bending techniques",
            "Joint preparation",
            "System testing"
          ]
        }
      ],
      icon: "tools"
    }
  }
];
