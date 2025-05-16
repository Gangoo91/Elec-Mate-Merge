
import React from 'react';
import { SubsectionProps } from './subsection1_1/types';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Subsection9_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="h-6 w-6 text-elec-yellow" />
          Power Factor Correction and Energy Efficiency
        </h2>
        <p className="text-muted-foreground">
          Understanding power factor correction techniques and energy efficiency principles for electrical installations.
        </p>
      </div>

      {/* Section 1: Power Factor Fundamentals */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Power Factor Fundamentals</h3>
          <div className="space-y-4">
            <p>
              Power factor is a measure of how efficiently electrical power is converted into useful work. 
              It is defined as the ratio of real power (kW) to apparent power (kVA).
            </p>
            
            <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
              <h4 className="text-lg font-medium text-elec-yellow mb-2">Key Power Factor Concepts:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Unity Power Factor (1.0)</strong>: Ideal scenario where all power is used effectively
                </li>
                <li>
                  <strong>Lagging Power Factor</strong>: When current lags voltage, typical with inductive loads like motors
                </li>
                <li>
                  <strong>Leading Power Factor</strong>: When current leads voltage, typical with capacitive loads
                </li>
                <li>
                  <strong>Poor Power Factor</strong>: Results in higher current draw, increased heat losses, and reduced system capacity
                </li>
              </ul>
            </div>
            
            <div className="flex items-center gap-3 mt-3 bg-blue-500/10 p-3 rounded-md border border-blue-500/20">
              <Info className="h-5 w-5 text-blue-400 flex-shrink-0" />
              <p className="text-sm">
                In the UK, electricity suppliers typically require commercial and industrial customers to maintain 
                a power factor above 0.9 to avoid penalty charges.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Power Factor Correction */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Power Factor Correction Techniques</h3>
          <div className="space-y-4">
            <p>
              Power factor correction involves the installation of equipment to improve the power factor 
              of a facility. This is typically achieved by adding capacitors to the system.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Fixed Power Factor Correction</h4>
                </div>
                <p className="text-sm">
                  Permanently connected capacitors that provide a fixed amount of reactive power. 
                  Suitable for installations with stable loads.
                </p>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Automatic Power Factor Correction</h4>
                </div>
                <p className="text-sm">
                  Utilises capacitor banks that switch in and out as required, based on real-time 
                  power factor measurements. Ideal for variable loads.
                </p>
              </div>
            </div>
            
            <div className="bg-elec-dark/70 p-4 rounded-md mt-4">
              <h4 className="font-medium text-elec-yellow mb-2">Benefits of Power Factor Correction:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Reduced electricity bills by eliminating power factor penalties</li>
                <li>Increased electrical system capacity</li>
                <li>Improved voltage regulation</li>
                <li>Reduced power system losses</li>
                <li>Lower carbon footprint through improved energy efficiency</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Energy Efficiency */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Energy Efficiency in Electrical Installations</h3>
          <div className="space-y-4">
            <p>
              Beyond power factor correction, there are numerous strategies to improve the energy efficiency 
              of electrical installations, helping to reduce electricity consumption and operating costs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-green-500/20 bg-elec-dark/50">
                <CardContent className="pt-4">
                  <h4 className="text-lg font-medium text-green-400 mb-2">Lighting Efficiency</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Replace traditional lighting with LED technology</li>
                    <li>Install occupancy sensors and daylight harvesting controls</li>
                    <li>Utilise zone lighting for task-specific illumination</li>
                    <li>Implement lighting management systems</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-green-500/20 bg-elec-dark/50">
                <CardContent className="pt-4">
                  <h4 className="text-lg font-medium text-green-400 mb-2">Motor Efficiency</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Specify high-efficiency or premium efficiency motors</li>
                    <li>Install variable speed drives (VSDs) where appropriate</li>
                    <li>Properly size motors to match the load requirements</li>
                    <li>Implement regular maintenance schedules</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-green-500/20 bg-elec-dark/50">
                <CardContent className="pt-4">
                  <h4 className="text-lg font-medium text-green-400 mb-2">Distribution Efficiency</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Use correctly sized conductors to minimise losses</li>
                    <li>Install high-efficiency transformers</li>
                    <li>Minimise distribution distances where possible</li>
                    <li>Implement proper load balancing across phases</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center gap-3 mt-3 bg-orange-500/10 p-3 rounded-md border border-orange-500/20">
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <p className="text-sm">
                From 2025, new non-domestic buildings in the UK will need to produce 27% less carbon 
                emissions compared to current standards, making energy efficiency measures increasingly important.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Separator className="bg-elec-yellow/30" />
      
      {/* UK Regulations and Standards */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">UK Regulations and Standards</h3>
          <div className="space-y-4">
            <p>
              Several UK regulations and standards address energy efficiency and power quality in electrical installations:
            </p>
            
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Part L of the Building Regulations</strong>: Sets minimum energy performance standards for new buildings 
                and existing buildings undergoing major renovations
              </li>
              <li>
                <strong>BS EN 50160</strong>: Defines acceptable power quality parameters including voltage characteristics
              </li>
              <li>
                <strong>Energy Savings Opportunity Scheme (ESOS)</strong>: Mandatory energy assessment scheme for large organisations
              </li>
              <li>
                <strong>Minimum Energy Efficiency Standards (MEES)</strong>: Sets minimum energy performance standards for commercial buildings
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      {/* Completion Button */}
      {!isCompleted && (
        <div className="pt-4">
          <Button 
            onClick={markAsComplete}
            className="px-4 py-2 bg-elec-yellow text-elec-dark rounded hover:bg-yellow-400 transition-colors"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark as Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Subsection9_2;
