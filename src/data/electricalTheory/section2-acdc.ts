
import { SectionData } from '../healthAndSafety/types';

export const acDcSuppliesSection: SectionData = {
  sectionNumber: "2",
  title: "AC and DC Supplies",
  content: {
    sectionNumber: "2",
    title: "AC and DC Supplies",
    description: "Understanding alternating and direct current electricity supply systems.",
    icon: "construction",
    isMainSection: true,
    subsections: [
      {
        id: "2.1",
        title: "Differences between AC and DC",
        content: "Alternating Current (AC) and Direct Current (DC) are the two fundamental forms of electricity. AC periodically reverses direction, following a sinusoidal waveform, while DC flows in one direction consistently. Most power generation and distribution systems use AC because it's easier to transform to different voltage levels, while most electronic devices internally use DC. Modern electrical installations often involve both AC and DC components, with conversion between them handled by rectifiers, inverters, and power supplies.",
        keyPoints: [
          "AC changes direction and magnitude periodically, typically 50Hz in the UK",
          "DC maintains a constant direction and often a steady magnitude",
          "AC is easier to transmit over long distances and transform to different voltages",
          "DC is used in batteries, electronics, and certain specialized applications"
        ]
      },
      {
        id: "2.2",
        title: "Single-phase and Three-phase Systems",
        content: "Electrical supplies are categorized as single-phase or three-phase. Single-phase supplies consist of one alternating voltage, typically used in domestic settings. Three-phase supplies consist of three alternating voltages, offset by 120° from each other, commonly used in industrial and commercial settings. Three-phase systems are more efficient for powering large motors and heavy loads, as they provide more consistent power delivery and can transmit more power with less conductor material.",
        keyPoints: [
          "Single-phase: 230V nominal in the UK, used in most domestic properties",
          "Three-phase: 400V nominal in the UK (phase to phase), used in commercial/industrial settings",
          "Three-phase provides more consistent power delivery and higher capacity",
          "Three-phase motors are more efficient and smaller than equivalent single-phase motors"
        ]
      },
      {
        id: "2.3",
        title: "Frequency and Waveforms",
        content: "The frequency of AC power describes how many complete cycles occur per second, measured in Hertz (Hz). In the UK, the standard frequency is 50Hz. The waveform describes the shape of the voltage or current over time. Sinusoidal waveforms are most common in power systems, but electronic equipment may generate or require other waveforms like square, triangle, or sawtooth patterns. Understanding waveform characteristics is important for diagnosing power quality issues and harmonics.",
        keyPoints: [
          "UK standard frequency is 50Hz (50 cycles per second)",
          "Sinusoidal waveforms are standard for power distribution",
          "Non-sinusoidal waveforms can cause harmonics and power quality issues",
          "Oscilloscopes are used to visualize and analyze waveforms in electrical systems"
        ]
      }
    ]
  }
};
