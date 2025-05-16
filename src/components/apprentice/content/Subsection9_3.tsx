
import React from 'react';
import { SubsectionProps } from './subsection1_1/types';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lightbulb, Search, Wrench, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Subsection9_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-elec-yellow" />
          Sustainable Electrical Technologies
        </h2>
        <p className="text-muted-foreground">
          Exploring renewable energy systems, energy storage, and smart technologies for modern electrical installations.
        </p>
      </div>

      {/* Section 1: Renewable Energy Systems */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Renewable Energy Systems for UK Installations</h3>
          <div className="space-y-4">
            <p>
              Renewable energy systems are increasingly becoming part of standard electrical installations in the UK, 
              driven by environmental concerns, building regulations, and financial incentives.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-elec-dark/50 border border-green-500/30 rounded-md p-4">
                <h4 className="text-lg font-medium text-green-400 mb-2">Solar Photovoltaic (PV) Systems</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>System Components</strong>: Solar panels, inverters, mounting systems, and monitoring equipment
                  </li>
                  <li>
                    <strong>UK Considerations</strong>: MCS certification, G99/G100 grid connection requirements, DNO notification
                  </li>
                  <li>
                    <strong>Installation Standards</strong>: IET Code of Practice for Grid-Connected Solar PV Systems
                  </li>
                  <li>
                    <strong>Current Trends</strong>: Increased adoption of integrated PV systems, higher efficiency panels, and microinverter technology
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 border border-green-500/30 rounded-md p-4">
                <h4 className="text-lg font-medium text-green-400 mb-2">Wind Energy Systems</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>System Components</strong>: Wind turbines, inverters, control systems, and tower structures
                  </li>
                  <li>
                    <strong>UK Considerations</strong>: Planning permission requirements, noise regulations, and wildlife impact assessments
                  </li>
                  <li>
                    <strong>Installation Standards</strong>: BS EN 61400 series for wind turbines
                  </li>
                  <li>
                    <strong>Current Trends</strong>: Small-scale vertical axis turbines for urban environments with lower wind speeds
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-elec-dark/50 border border-green-500/30 rounded-md p-4 mt-4">
              <h4 className="text-lg font-medium text-green-400 mb-2">Heat Pumps and Renewable Heating</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-1">Air Source Heat Pumps (ASHPs)</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Electrical requirements: Dedicated circuit, typically 32A</li>
                    <li>UK planning: Permitted development in many cases</li>
                    <li>Financial support: Renewable Heat Incentive (RHI)</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium mb-1">Ground Source Heat Pumps (GSHPs)</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Higher efficiency but more complex installation</li>
                    <li>Requires significant groundworks</li>
                    <li>Higher RHI payments available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Energy Storage */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Energy Storage Technologies</h3>
          <div className="space-y-4">
            <p>
              Energy storage systems are becoming vital components in modern electrical installations, 
              allowing for better utilisation of renewable energy and providing backup power capabilities.
            </p>
            
            <div className="bg-elec-dark/50 border border-blue-400/30 rounded-md p-4">
              <h4 className="text-lg font-medium text-blue-400 mb-3">Battery Storage Systems</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium">Lithium-Ion Batteries</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Most common residential solution</li>
                    <li>High energy density, low maintenance</li>
                    <li>Requires BMS (Battery Management System)</li>
                    <li>5-15 year lifespan in typical UK conditions</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium">Lead-Acid Batteries</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Lower initial cost</li>
                    <li>Proven technology</li>
                    <li>Heavier and bulkier</li>
                    <li>3-7 year typical lifespan</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium">Flow Batteries</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Emerging technology for larger installations</li>
                    <li>Longer lifespan (15-20+ years)</li>
                    <li>Lower efficiency</li>
                    <li>Suitable for commercial applications</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="font-medium mb-2">UK Installation Requirements:</h5>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Compliance with BS EN 62619 for safety of lithium batteries</li>
                  <li>Fire protection considerations (especially for lithium batteries)</li>
                  <li>G99 compliance for grid-connected systems above 16A per phase</li>
                  <li>Requirements for ventilation, temperature control and accessibility</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Smart Technologies */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Smart Technologies and Integration</h3>
          <div className="space-y-4">
            <p>
              Smart technologies are transforming electrical installations into interactive, efficient systems 
              that provide advanced control, monitoring and automation capabilities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-lg font-medium">Smart Monitoring Systems</h4>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Energy Monitoring</strong>: Real-time consumption tracking and analysis
                  </li>
                  <li>
                    <strong>Load Disaggregation</strong>: Identifying individual appliance usage patterns
                  </li>
                  <li>
                    <strong>Power Quality Monitoring</strong>: Detection of harmonic issues, voltage variations
                  </li>
                  <li>
                    <strong>Installation Standards</strong>: BS EN 50491 series for smart home systems
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-lg font-medium">Smart Control Systems</h4>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Demand Response</strong>: Dynamic load management based on grid conditions
                  </li>
                  <li>
                    <strong>Home Energy Management Systems</strong>: Optimising energy use and storage
                  </li>
                  <li>
                    <strong>EV Charging Integration</strong>: Smart charging to utilise renewable generation
                  </li>
                  <li>
                    <strong>UK Requirements</strong>: Smart metering technical specifications (SMETS2)
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-elec-dark/70 rounded-md p-4 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-elec-yellow" />
                <h4 className="text-lg font-medium text-elec-yellow">Security and Safety Considerations</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-1">Cybersecurity</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Network segregation for critical systems</li>
                    <li>Secure configuration and regular updates</li>
                    <li>Compliance with IET Code of Practice for Cyber Security</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium mb-1">Data Protection</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>GDPR compliance for all collected usage data</li>
                    <li>Secure storage and transmission of personal data</li>
                    <li>Customer consent for data collection and usage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Separator className="bg-elec-yellow/30" />
      
      {/* UK Market and Future Trends */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">UK Market and Future Trends</h3>
          <div className="space-y-4">
            <p>
              The UK sustainable technology market has unique characteristics and is evolving rapidly in response to energy policy, 
              climate targets and technological advances.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-elec-dark/50 border border-purple-500/30 rounded-md p-4">
                <h4 className="text-lg font-medium text-purple-400 mb-2">Current UK Market Trends</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Explosive growth in domestic EV charger installations</li>
                  <li>Increasing uptake of battery storage with solar PV</li>
                  <li>Heat pump installations rising in response to gas boiler phase-out plans</li>
                  <li>Smart meter rollout continuing across the UK</li>
                  <li>Greater integration of flexibility services for domestic users</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 border border-purple-500/30 rounded-md p-4">
                <h4 className="text-lg font-medium text-purple-400 mb-2">Future Developments</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Vehicle-to-grid (V2G) technology becoming mainstream</li>
                  <li>Neighbourhood battery schemes for shared energy storage</li>
                  <li>Peer-to-peer energy trading enabled by blockchain technology</li>
                  <li>Increased adoption of DC microgrids for improved efficiency</li>
                  <li>Integration of AI for predictive energy management</li>
                </ul>
              </div>
            </div>
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

export default Subsection9_3;
