
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Wrench, Construction, Hammer, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const InspectionAreas = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      {/* Back button */}
      <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation/unit/elec2-01/section/2/subsection/2.1">
        <Button variant="outline" className="mb-8 border-elec-yellow/30 hover:bg-elec-yellow/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workplace Inspection Procedures
        </Button>
      </Link>
      
      {/* Main content */}
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Key Areas of Focus for Electrical Workplace Inspections
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            A comprehensive workplace inspection should cover these critical areas to ensure safety in electrical work environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Zap className="mr-3 h-5 w-5" /> Electrical Installations
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Review of fixed electrical installations and distribution systems for safety compliance.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Distribution Boards</span>: Labeling, access, and condition</li>
                <li><span className="font-medium text-white">Circuit Protection</span>: RCDs, MCBs, and their operation</li>
                <li><span className="font-medium text-white">Cables and Wiring</span>: Insulation integrity, support, and protection</li>
                <li><span className="font-medium text-white">Earthing Systems</span>: Connections, bonding, and continuity</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Wrench className="mr-3 h-5 w-5" /> Portable Equipment
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Assessment of portable electrical tools, testing equipment, and appliances.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">PAT Testing</span>: Test records, labels, and frequency</li>
                <li><span className="font-medium text-white">Cable Condition</span>: Damage, strain relief, and appropriate plugs</li>
                <li><span className="font-medium text-white">Tool Storage</span>: Proper storage practices and organization</li>
                <li><span className="font-medium text-white">Power Supplies</span>: Extension leads, adaptors, and 110V systems</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Construction className="mr-3 h-5 w-5" /> Work Areas and Access
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Evaluation of work environments, including access equipment and housekeeping.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Access Equipment</span>: Ladders, platforms, and scaffold condition</li>
                <li><span className="font-medium text-white">Walkways</span>: Clear access, trip hazards, and lighting</li>
                <li><span className="font-medium text-white">Working Space</span>: Adequate room for safe work and emergency exits</li>
                <li><span className="font-medium text-white">Housekeeping</span>: Material storage, waste management, and cleanliness</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Shield className="mr-3 h-5 w-5" /> Safety Systems
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Inspection of safety equipment, signage, and emergency systems.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Fire Equipment</span>: Extinguishers, alarms, and escape routes</li>
                <li><span className="font-medium text-white">PPE</span>: Availability, condition, and appropriate selection</li>
                <li><span className="font-medium text-white">First Aid</span>: Kits, facilities, and trained personnel</li>
                <li><span className="font-medium text-white">Safety Signage</span>: Hazard warnings, emergency information, and visibility</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Inspection Priorities by Work Area</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-elec-light/90">
            <div>
              <h3 className="font-medium text-white mb-2">Construction Sites</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Temporary installations</li>
                <li>110V systems</li>
                <li>Exclusion zones</li>
                <li>Weather protection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Commercial Buildings</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Emergency lighting</li>
                <li>Access control systems</li>
                <li>Distribution boards</li>
                <li>Public interface protections</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Industrial Facilities</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Isolation procedures</li>
                <li>High voltage equipment</li>
                <li>Machine guarding</li>
                <li>Control systems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionAreas;
