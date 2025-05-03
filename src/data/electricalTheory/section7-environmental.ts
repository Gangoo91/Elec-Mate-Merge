
import { SectionData } from '../healthAndSafety/types';

export const environmentalConsiderationsSection: SectionData = {
  sectionNumber: "7",
  title: "Environmental Considerations",
  content: {
    sectionNumber: "7",
    title: "Environmental Considerations",
    description: "Environmental aspects and sustainable practices in electrical installations.",
    icon: "info",
    isMainSection: true,
    subsections: [
      {
        id: "7.1",
        title: "Energy Efficiency in Installations",
        content: "Electrical installations have significant environmental impact through energy consumption. Energy-efficient installations incorporate proper cable sizing to minimize losses, efficient lighting systems such as LED technology, and control systems that reduce unnecessary usage. Voltage optimization can improve efficiency and equipment lifespan. Power factor correction reduces reactive power and associated losses. Smart metering and monitoring systems provide data to identify improvement opportunities. These measures not only reduce environmental impact but also lower operating costs for clients.",
        keyPoints: [
          "Proper cable sizing reduces resistive losses and voltage drop",
          "LED lighting typically uses 75-80% less energy than incandescent lighting",
          "Automatic controls (PIR sensors, timers) minimize unnecessary energy usage",
          "Monitoring systems identify usage patterns and opportunities for improvement"
        ]
      },
      {
        id: "7.2",
        title: "Use of Sustainable Materials",
        content: "The environmental impact of electrical installations extends to the materials used. Low-smoke zero-halogen (LSZH) cables provide safer operation in fire conditions with reduced toxic emissions. Recyclable metals and plastics reduce landfill waste and resource consumption. PVC-free materials avoid potential environmental contamination. Manufacturers increasingly provide Environmental Product Declarations (EPDs) detailing the lifecycle impact of products. Responsible material selection and end-of-life disposal or recycling are important considerations for sustainable electrical installations.",
        keyPoints: [
          "Low-smoke zero-halogen cables reduce toxic emissions in fire conditions",
          "Recyclable components minimize waste and resource consumption",
          "Consideration of product lifespan and durability in material selection",
          "Proper disposal and recycling of electrical equipment at end-of-life"
        ]
      },
      {
        id: "7.3",
        title: "Minimising Environmental Impact",
        content: "Beyond material selection and energy efficiency, electrical installations can be designed to minimize environmental impact through various strategies. Renewable energy integration, such as solar PV systems, reduces dependence on fossil fuels. Smart systems and load management optimize energy use and enable demand response. Efficient space utilization of equipment and containment systems reduces material usage. Modular designs facilitate future upgrades with minimal waste. Proper commissioning ensures systems operate at optimal efficiency, and documentation enables effective maintenance throughout the installation's life.",
        keyPoints: [
          "Integration with renewable energy systems reduces carbon footprint",
          "Smart systems optimize energy usage based on demand and availability",
          "Efficient design minimizes material usage and installation waste",
          "Proper maintenance ensures continued efficiency throughout system lifecycle"
        ]
      }
    ]
  }
};
