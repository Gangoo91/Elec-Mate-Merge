
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lightbulb, Smartphone, LampDesk } from "lucide-react";

interface Subsection5_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection5_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection5_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Modern Lighting Technologies</h2>
      
      <div className="space-y-4">
        <p>
          Modern lighting installations increasingly use energy-efficient technologies like LED lighting, which presents
          different electrical characteristics compared to traditional lighting, along with advanced control systems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              LED Lighting Systems
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Advantages and Characteristics</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Energy efficiency: 75-80% less energy than incandescent lighting</li>
                <li>Long life: typically 25,000-50,000 hours</li>
                <li>Low heat output compared to traditional lighting</li>
                <li>Directional light output, reducing wasted light</li>
                <li>Instant start with no warm-up period</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Installation Considerations</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>LED drivers may have high inrush currents (10-20× running current)</li>
                <li>Power factor may be poor without correction (0.5-0.6)</li>
                <li>May generate harmonics requiring oversized neutral conductors</li>
                <li>Sensitive to overheating - adequate ventilation essential</li>
                <li>Some require specific dimmer types (trailing-edge vs. leading-edge)</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Circuit Design Implications:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Consider inrush current when calculating maximum circuit loading</li>
                  <li>Type C MCBs often better suited than Type B for LED circuits</li>
                  <li>Diversity factors differ from traditional lighting</li>
                  <li>Lower VA ratings allow more fittings per circuit</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <LampDesk className="h-5 w-5 mr-2" />
              Other Modern Lighting Technologies
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Compact Fluorescent Lamps (CFLs)</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Higher efficiency than incandescent but less than LED</li>
                <li>Contain small amounts of mercury - disposal considerations</li>
                <li>Warm-up time to reach full brightness</li>
                <li>Shorter lifespan than LED (8,000-15,000 hours)</li>
                <li>Limited dimming capabilities</li>
              </ul>
              
              <h4 className="font-semibold mt-4">High-Frequency Fluorescent</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Electronic ballasts eliminate flicker and improve efficiency</li>
                <li>Longer lamp life than traditional fluorescent systems</li>
                <li>Better power factor than older magnetic ballast systems</li>
                <li>Reduced heat output compared to magnetic ballasts</li>
                <li>High-frequency dimmable versions available</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Other Technologies:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Halogen: higher efficiency than incandescent but being phased out</li>
                  <li>Metal halide: high-output for commercial and industrial applications</li>
                  <li>High-pressure sodium: efficient but poor color rendering</li>
                  <li>Induction lighting: very long life, good for inaccessible locations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Advanced Lighting Control Systems
          </h3>
          
          <div className="space-y-4">
            <p>Modern lighting controls offer significant energy savings and enhanced functionality:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Sensor-Based Controls</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Presence/absence detection</span>
                    <p className="text-sm mt-1">PIR or microwave sensors to automatically control lighting based on occupancy</p>
                  </li>
                  <li>
                    <span className="font-medium">Daylight harvesting</span>
                    <p className="text-sm mt-1">Light level sensors to dim artificial lighting when natural light is available</p>
                  </li>
                  <li>
                    <span className="font-medium">Time-based controls</span>
                    <p className="text-sm mt-1">Programmed schedules for automatic switching or dimming</p>
                  </li>
                  <li>
                    <span className="font-medium">Combined sensor systems</span>
                    <p className="text-sm mt-1">Integration of multiple sensor types for comprehensive control</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Smart Lighting Systems</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Wireless control protocols</span>
                    <p className="text-sm mt-1">Zigbee, Z-Wave, Bluetooth, WiFi for flexible control</p>
                  </li>
                  <li>
                    <span className="font-medium">Centralized management</span>
                    <p className="text-sm mt-1">Building management systems integration for comprehensive control</p>
                  </li>
                  <li>
                    <span className="font-medium">Scene setting</span>
                    <p className="text-sm mt-1">Programmable lighting scenes for different activities</p>
                  </li>
                  <li>
                    <span className="font-medium">DALI systems</span>
                    <p className="text-sm mt-1">Digital Addressable Lighting Interface for individual fixture control</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Compatibility Considerations:</p>
              <p>When specifying lighting control systems, ensure compatibility between control devices and light fittings. LED compatibility with dimmer types is particularly important, as incompatibility can cause flickering, reduced lifespan, or complete failure. Using dimmable LED drivers with compatible dimming methods (0-10V, DALI, trailing edge, etc.) is essential for proper operation.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Subsection5_2;
