
import { Compass } from 'lucide-react';

export const DesignInformation = () => {
  const designElements = [
    {
      title: "Circuit Design Information",
      details: [
        "Maximum demand calculations and diversity factors",
        "Protective device characteristics and discrimination",
        "Cable sizing calculations and voltage drop",
        "Earthing system arrangements (TN-S, TN-C-S, TT)",
        "RCD selection and coordination",
        "Special location design requirements"
      ]
    },
    {
      title: "Installation Methods",
      details: [
        "Cable installation methods and reference numbers",
        "Containment systems and support requirements",
        "Segregation requirements for different circuit types",
        "IP ratings and environmental protection levels",
        "Fire barrier and compartmentation details",
        "Access and maintenance provisions"
      ]
    },
    {
      title: "Load and Performance Data",
      details: [
        "Connected loads and operating characteristics",
        "Starting currents and power factor corrections",
        "Harmonic considerations and filtering requirements",
        "Emergency and standby supply arrangements",
        "Control and monitoring system integration",
        "Energy efficiency and sustainability measures"
      ]
    },
    {
      title: "Safety and Protection Systems",
      details: [
        "Arc fault detection and protection systems",
        "Emergency lighting and fire alarm integration",
        "Surge protection device specifications",
        "Isolation and switching arrangements",
        "Warning and identification systems",
        "Personal protective equipment requirements"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Compass className="h-4 w-4" />
        Critical Design Information Requirements
      </h3>
      <p className="text-foreground mb-4">
        Understanding the original design intent is essential for effective visual inspection:
      </p>
      <div className="space-y-4">
        {designElements.map((element, index) => (
          <div key={index} className="bg-[#323232] rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">{element.title}</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {element.details.map((detail, detailIndex) => (
                <li key={detailIndex} className="text-foreground flex items-start gap-2 text-sm">
                  <span className="text-elec-yellow mt-1">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
        <p className="text-green-200 font-medium">
          <strong>Professional Tip:</strong> If design calculations aren't available, you may need to reverse-engineer the installation to verify compliance. This significantly increases inspection time and may require additional testing.
        </p>
      </div>
    </div>
  );
};
