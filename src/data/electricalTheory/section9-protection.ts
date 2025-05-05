
import { SectionData } from '../healthAndSafety/types';

export const overcurrentProtectionSection: SectionData = {
  sectionNumber: "9",
  title: "Overcurrent Protection",
  content: {
    sectionNumber: "9",
    title: "Overcurrent Protection",
    description: "Overcurrent protection is essential to safeguard electrical installations from damage and fire risks caused by excessive current flow.",
    icon: "shield",
    isMainSection: true,
    subsections: [
      {
        id: "9.1",
        title: "Overload and Short Circuit Protection",
        content: "Overcurrent protection safeguards against two types of excessive current: overloads and short-circuits. Overload occurs when too many appliances or excessive load draws more current than the circuit's rated capacity over an extended period. Short-circuit occurs when there is a direct fault between live conductors or a live conductor and earth, causing very high current. Protection devices must be rated to carry the design current indefinitely while protecting against both conditions. BS 7671 requires that protective devices interrupt overcurrent before it causes danger due to thermal or mechanical effects. The selection of appropriate protective devices considers their breaking capacity, discrimination with other devices, and coordination with the cables they protect.",
        keyPoints: [
          "Overload protection prevents damage from excess current over time",
          "Short-circuit protection must operate rapidly for very high currents",
          "Breaking capacity of devices must exceed maximum prospective fault current",
          "Protection must coordinate with cable size and characteristics"
        ]
      },
      {
        id: "9.2",
        title: "Protective Devices",
        content: "Various protective devices are used for overcurrent protection. Fuses contain a wire that melts when excessive current flows, breaking the circuit. They are simple and reliable but must be replaced after operation. Circuit breakers are mechanical switches that automatically trip when detecting overcurrent and can be reset after removing the fault. They come in different types including Miniature Circuit Breakers (MCBs), Moulded Case Circuit Breakers (MCCBs), and Residual Current Circuit Breakers with Overcurrent protection (RCBOs). Each device has characteristics defined by their type (B, C, D) which determines their response to fault currents. Selection depends on the circuit type, expected loads, and potential fault conditions.",
        keyPoints: [
          "Fuses are single-use devices with predictable operating characteristics",
          "MCBs offer resettable protection with different trip characteristics",
          "RCBOs combine overcurrent and residual current protection in one device",
          "Device characteristics (B, C, D) suit different load types and inrush currents"
        ]
      },
      {
        id: "9.3",
        title: "Discrimination and Coordination",
        content: "Discrimination (or selectivity) in protective devices ensures that when a fault occurs, only the device closest to the fault operates, minimizing disruption to other circuits. This is achieved through careful selection of device types, ratings, and characteristics. Series coordination ensures that devices work together under fault conditions, with the upstream device protecting the downstream device when necessary. Proper discrimination and coordination are particularly important in installations with critical loads where unnecessary outages must be avoided. Achieving effective discrimination requires consideration of both the normal operating characteristics and the fault response times of all devices in the system.",
        keyPoints: [
          "Proper discrimination minimizes disruption during fault conditions",
          "Achieved through selection of device types, ratings, and time characteristics",
          "Essential for installations with critical loads or tiered distribution systems",
          "Must be considered at the design stage and verified during commissioning"
        ]
      }
    ]
  }
};
