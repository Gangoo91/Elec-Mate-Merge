
import { SectionData } from './types';

export const hazardsSection: SectionData = {
  sectionNumber: "5",
  title: "Identifying & Dealing with Hazards",
  content: {
    sectionNumber: "5",
    title: "Identifying and Dealing with Hazards",
    description: "Developing the ability to spot potential hazards in electrical work environments and implementing appropriate control measures.",
    icon: "warning",
    isMainSection: true,
    subsections: [
      {
        id: "5.1",
        title: "Risk Assessment Process",
        content: "A comprehensive risk assessment process is fundamental to safety in electrical work. The five-step approach begins with hazard identification, systematically examining work activities to identify anything with potential to cause harm, including electrical, physical, environmental, and health hazards. The second step determines who might be harmed—not just electrical workers, but also other trades on site, building occupants, or the public—and how each group might be affected differently. The third step evaluates risks by considering both the likelihood of harm occurring and its potential severity, then determining whether existing precautions are adequate or if more controls are needed. Risk evaluation should use a consistent methodology, often using a 5×5 matrix (likelihood × severity) to produce a numerical risk rating. The fourth step involves recording findings in a formal document that identifies hazards, specifies who is at risk, describes control measures, assigns responsibilities, and sets review dates. Finally, risk assessments must be regularly reviewed, especially when work methods change, new equipment is introduced, after incidents occur, or at planned intervals. Dynamic risk assessment supplements formal written assessments, with workers continuously evaluating changing conditions and responding appropriately. For electrical work, risk assessments should specifically address isolation procedures, test equipment selection, use of appropriate PPE, emergency procedures, and access requirements. Method statements often accompany risk assessments, detailing step-by-step procedures for completing high-risk tasks safely. Effective risk assessment requires worker involvement at all stages, as those performing tasks often have the best insight into practical hazards and controls.",
        keyPoints: [
          "Five steps of risk assessment: identify hazards, determine who might be harmed, evaluate risks, record findings, review assessment",
          "Dynamic risk assessment techniques for changing conditions",
          "Documentation requirements and templates",
          "Review and updating procedures for risk assessments",
          "Worker involvement in the risk assessment process"
        ]
      },
      {
        id: "5.2",
        title: "Common Electrical Hazards",
        content: "Electrical work involves numerous hazards that must be recognized and controlled. Electric shock occurs when current passes through the body, with severity depending on current magnitude, pathway through the body, and duration. As little as 50mA through the heart can be fatal, while higher currents cause tissue burns, respiratory failure, and cardiac arrest. Arc flash is an explosive release of energy when a high-amperage fault occurs, generating temperatures up to 20,000°C, intense UV radiation, molten metal splatter, and pressure waves. These can cause severe burns, eye damage, hearing damage, and blast injuries. Fire risks from electrical faults are significant, with overheated conductors, loose connections, and damaged insulation commonly causing ignition. Electrical fires often start within walls or ceiling voids, spreading undetected before visible detection. Secondary hazards include falls resulting from shock or arc blast, which may throw workers from height or cause them to react involuntarily and lose balance. Confined spaces present additional risks, with limited escape routes and potential for gases to accumulate. Stored energy in capacitors and inductors can deliver shocks even after power disconnection, requiring specific discharge procedures. Cable striking during excavation or drilling into walls remains a common cause of electrical injuries, requiring cable detection tools and safe digging practices. Damaged equipment or installations create unpredictable hazards, particularly in older buildings or following flooding/fire damage. Identifying these hazards requires thorough inspection before work begins, including visual checks, testing where appropriate, and consulting building records and installation certificates.",
        keyPoints: [
          "Electric shock and its physiological effects",
          "Arc flash and blast hazards",
          "Fire risks from electrical faults",
          "Secondary hazards such as falls after shock",
          "Cable strike risks during excavation or drilling"
        ]
      },
      {
        id: "5.3",
        title: "Hierarchy of Control Measures",
        content: "The hierarchy of control provides a systematic approach to implementing the most effective safety measures for electrical hazards. Elimination, the most effective control, involves completely removing the hazard, such as de-commissioning redundant electrical circuits rather than leaving them disconnected but present. When elimination isn't feasible, substitution replaces the hazard with something less dangerous, like using 110V tools instead of 230V, or replacing aging installations with modern equipment featuring enhanced safety features. Engineering controls modify designs or equipment to reduce risk, such as installing permanent RCD protection, implementing automatic isolation systems, or redesigning installations to locate equipment in more accessible positions. When hazards cannot be adequately controlled through these higher-level methods, administrative controls change how people work around the hazard. These include implementing permit-to-work systems, establishing clear procedures for isolation and testing, providing regular training, using warning signs, and implementing supervision for high-risk tasks. Personal protective equipment (PPE), while essential, is considered the last line of defense because it doesn't eliminate hazards and relies on correct selection, use, and maintenance. For electrical work, PPE includes insulated tools, voltage-rated gloves, arc flash protection, safety eyewear, and appropriate footwear. The most effective risk management typically involves multiple control measures across different hierarchy levels. When selecting controls, consideration should be given to long-term sustainability, maintenance requirements, the introduction of new risks, and worker acceptance. Controls should be regularly reviewed for effectiveness and updated as technology or work practices change.",
        keyPoints: [
          "Elimination - removing the hazard completely",
          "Substitution - replacing with less hazardous alternatives",
          "Engineering controls - redesigning equipment or processes",
          "Administrative controls - changing work methods",
          "Personal protective equipment - last line of defense",
          "Implementing multiple controls from different hierarchy levels for best protection"
        ]
      }
    ]
  }
};
