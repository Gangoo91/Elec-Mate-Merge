
import React from "react";
import { SubsectionProps } from "../../types";
import ElectricalTheorySubsection from "./ElectricalTheorySubsection";
import ElectricalTheoryHSAWA from "@/components/apprentice/content/subsection1_1/ElectricalTheoryHSAWA";
import ElectricalTheoryEWR from "@/components/apprentice/content/subsection1_1/ElectricalTheoryEWR";

export const renderElectricalTheorySection1 = (subsectionId: string, isCompleted: boolean, markAsComplete: () => void) => {
  // Map the subsection IDs to content
  switch (subsectionId) {
    case "1.1":
    case "1":
      return (
        <ElectricalTheoryHSAWA
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    case "1.2":
    case "2":
      return (
        <ElectricalTheoryEWR
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    case "1.3":
    case "3":
      return (
        <ElectricalTheorySubsection
          title="Building Regulations (Part P)"
          content="Part P of the Building Regulations applies to electrical installations in dwellings in England and Wales. It was introduced to reduce the number of injuries and deaths caused by electric shocks and fires in homes."
          keyPoints={[
            "Electrical installation work in dwellings must meet the requirements of Part P.",
            "Notifiable work must be certified by a registered competent person or inspected by building control.",
            "Notifiable work includes new circuits, work in special locations (bathrooms, swimming pools), and consumer unit replacements.",
            "Certification demonstrates that work meets safety requirements and complies with BS 7671."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    case "1.4":
    case "4":
      return (
        <ElectricalTheorySubsection
          title="British Standards (BS 7671)"
          content="BS 7671, also known as the IET Wiring Regulations, is the national standard for electrical installations in the UK. It provides detailed technical requirements to ensure the safety of electrical installations in buildings."
          keyPoints={[
            "Currently on the 18th Edition, the regulations are updated periodically to reflect new technologies and safety considerations.",
            "Compliance with BS 7671 is the primary way to satisfy Part P of the Building Regulations.",
            "The standard covers all aspects of electrical installation including design, selection, erection, inspection, and testing.",
            "It includes provisions for protection against electric shock, thermal effects, overcurrent, and more."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    case "1.5":
    case "5":
      return (
        <ElectricalTheorySubsection
          title="Guidance Documents"
          content="Various guidance documents are published to help electricians interpret and apply the regulations effectively in practical situations. These include official publications from the IET and other industry bodies."
          keyPoints={[
            "The IET On-Site Guide provides practical guidance for electricians working on-site.",
            "Guidance Notes expand on specific aspects of BS 7671, such as protection, isolation, and earthing.",
            "The Electrician's Guide to Good Electrical Practice offers practical advice on installation techniques.",
            "Manufacturer's instructions provide specific guidance for the installation and use of particular equipment."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    case "1.6":
    case "6":
      return (
        <ElectricalTheorySubsection
          title="Roles and Responsibilities"
          content="Electrical installation work involves multiple parties, each with specific roles and responsibilities to ensure compliance with regulations and safety standards."
          keyPoints={[
            "Designers must specify installations that comply with BS 7671 and other relevant standards.",
            "Installers are responsible for the quality of their work and ensuring it meets the regulations.",
            "Inspectors verify that installations comply with regulations through inspection and testing.",
            "Clients have responsibilities to select competent designers and installers, and to ensure adequate information is provided."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    default:
      return <p>Content for electrical theory subsection {subsectionId} is not yet available.</p>;
  }
};

