
import { SectionData } from '../healthAndSafety/types';

export const lightingCircuitsSection: SectionData = {
  sectionNumber: "5",
  title: "Lighting Circuits",
  content: {
    sectionNumber: "5",
    title: "Lighting Circuits",
    description: "Lighting circuits are fundamental components of electrical installations, providing illumination throughout buildings.",
    icon: "bulb",
    isMainSection: true,
    subsections: [
      {
        id: "5.1",
        title: "Lighting Circuit Configurations",
        content: "Lighting circuits in domestic and commercial installations typically operate at 230V and are protected by MCBs or fuses rated at 6A or 10A. One-way switching controls lights from a single location, using one-way switches. Two-way switching allows control from two locations, using a pair of two-way switches. Intermediate switching enables control from three or more locations, using two-way switches at the ends and intermediate switches at additional control points. The number of lighting points per circuit is determined by the total load, with consideration for diversity factors, as most lights will not be on simultaneously.",
        keyPoints: [
          "One-way switching uses a single switch for simple control",
          "Two-way switching uses a pair of two-way switches for control from two points",
          "Intermediate switching allows control from three or more locations",
          "Circuit design must consider the total connected load and diversity"
        ]
      },
      {
        id: "5.2",
        title: "Modern Lighting Technologies",
        content: "Modern lighting installations increasingly use energy-efficient technologies like LED lighting, which presents different electrical characteristics compared to traditional lighting. LED lighting offers significantly lower energy consumption, longer life, and reduced heat output, but can have high inrush currents that affect circuit design. Control systems have also evolved, with options including dimmer switches, presence detectors, daylight sensors, and smart lighting systems that can be controlled remotely. These technologies require specific consideration in circuit design, including compatibility between control devices and light fittings, and potential effects on power quality.",
        keyPoints: [
          "LED lighting offers energy efficiency but requires compatible control gear",
          "Smart lighting systems enable remote and automated control",
          "Sensor-based controls can significantly reduce energy consumption",
          "Dimming systems must be compatible with the specific lighting technology"
        ]
      },
      {
        id: "5.3",
        title: "Emergency Lighting Requirements",
        content: "Emergency lighting is required in many buildings to provide illumination when the normal supply fails. Systems must comply with BS 5266, which specifies requirements for installation, operation, and maintenance. Emergency lighting includes escape route lighting to illuminate exit routes, open area lighting to prevent panic, and high-risk task area lighting for dangerous processes. Systems may be self-contained (with individual batteries in each fitting) or centrally powered. Regular testing and maintenance are essential legal requirements. Understanding the design principles and regulatory requirements for emergency lighting is crucial for creating safe installations that comply with building regulations and fire safety legislation.",
        keyPoints: [
          "Emergency lighting must comply with BS 5266 standards",
          "Systems must provide minimum illumination levels for safe evacuation",
          "Regular testing and maintenance are legal requirements",
          "Documentation of system design and testing is essential"
        ]
      }
    ]
  }
};
