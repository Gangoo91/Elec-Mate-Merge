
import { SectionData } from '../healthAndSafety/types';

export const basicElectricalTheorySection: SectionData = {
  sectionNumber: "1",
  title: "Basic Electrical Theory",
  content: {
    sectionNumber: "1",
    title: "Basic Electrical Theory",
    description: "Fundamental electrical concepts including voltage, current, and resistance relationships.",
    icon: "info",
    isMainSection: true,
    subsections: [
      {
        id: "1.1",
        title: "Voltage, Current, Resistance, and Power Relationships",
        content: "Electrical theory forms the foundation of all electrical work. Understanding the relationship between voltage, current, resistance and power is essential for any electrical installation professional. Voltage (V) is the electrical pressure or potential difference between two points, measured in volts. Current (I) is the flow of electrical charge, measured in amperes (amps). Resistance (R) is the opposition to current flow, measured in ohms (Ω). Power (P) is the rate of energy conversion, measured in watts (W).",
        keyPoints: [
          "Voltage is measured in volts (V) and represents electrical pressure",
          "Current is measured in amperes (A) and represents the flow of electrical charge",
          "Resistance is measured in ohms (Ω) and represents opposition to current flow",
          "Power is measured in watts (W) and represents the rate of energy conversion"
        ]
      },
      {
        id: "1.2",
        title: "Ohm's Law and Power Law",
        content: "Ohm's Law defines the relationship between voltage, current, and resistance. It states that the current flowing through a conductor is directly proportional to the voltage and inversely proportional to the resistance. This is expressed as I = V/R, where I is current, V is voltage, and R is resistance. The formula can be rearranged to V = I×R or R = V/I. Power Law describes how power relates to voltage and current, expressed as P = V×I. Using Ohm's Law, we can derive alternate forms: P = I²×R and P = V²/R.",
        keyPoints: [
          "Ohm's Law: I = V/R, V = I×R, R = V/I",
          "Power Law: P = V×I, P = I²×R, P = V²/R",
          "These formulas form the basis of all electrical circuit calculations",
          "Understanding these relationships is crucial for sizing circuits correctly"
        ]
      },
      {
        id: "1.3",
        title: "Series and Parallel Circuits",
        content: "Circuits can be configured in series, parallel, or a combination of both. In a series circuit, components are connected end-to-end, creating a single path for current. In a series circuit, the current is the same throughout the circuit, but the voltage is divided across components. In a parallel circuit, components are connected across common points, creating multiple paths for current. In a parallel circuit, the voltage is the same across each branch, but the current divides between the branches. Understanding the differences is crucial for circuit design and fault finding.",
        keyPoints: [
          "Series circuits: current is constant, voltage divides, resistances add (Rtotal = R1 + R2 + ...)",
          "Parallel circuits: voltage is constant, current divides, resistances combine as 1/Rtotal = 1/R1 + 1/R2 + ...",
          "Most practical installations use a combination of series and parallel configurations",
          "Circuit analysis techniques apply these principles to solve complex circuits"
        ]
      }
    ]
  }
};
