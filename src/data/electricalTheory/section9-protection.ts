import { SectionData } from '../healthAndSafety/types';

export const overcurrentProtectionSection: SectionData = {
  sectionNumber: "9",
  title: "Overcurrent Protection",
  content: {
    sectionNumber: "9",
    title: "Overcurrent Protection",
    description: "Overcurrent protection is essential to safeguard electrical installations from damage and fire risks caused by excessive current flow.",
    icon: "shield-alert", // Changed from "safety" to "shield-alert"
    isMainSection: true,
    subsections: [
      {
        id: "9.1",
        title: "Principles of Overcurrent Protection",
        content: "Overcurrent protection is designed to protect circuits and equipment from damage caused by excessive current flow due to overloads or short-circuits. Overloads occur when too many devices are connected to a circuit, causing a sustained current above the rated value. Short-circuits happen when live conductors come into direct contact, resulting in a very high current flow. Protection devices must be sized correctly according to the circuit's current-carrying capacity and installed at appropriate points in the system. The type of protection required depends on the nature of the circuit and the potential fault conditions, with proper selection crucial for maintaining both safety and continuity of supply.",
        keyPoints: [
          "Circuit protection must respond to both overloads and short-circuits",
          "Protective devices must be rated according to circuit conductor capacity",
          "Time/current characteristics determine device response to different faults",
          "Coordination between protective devices ensures discrimination"
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
