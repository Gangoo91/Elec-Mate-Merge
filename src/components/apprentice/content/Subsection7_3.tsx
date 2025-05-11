
import React from 'react';
import { SubsectionProps } from './subsection1_1/types';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import CourseContentSection from '@/components/apprentice/CourseContentSection';

const Subsection7_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Main header with background */}
      <div className="bg-elec-dark border border-elec-yellow/30 rounded-lg p-5">
        <h2 className="text-2xl md:text-3xl font-bold text-elec-yellow">Manual Handling in Practice</h2>
        <p className="mt-2 text-elec-light/80">
          Hands-on application of safe manual handling techniques for electrical work
        </p>
      </div>
      
      {/* Introduction Section */}
      <CourseContentSection
        title="Practical Manual Handling Applications"
        description="This section provides practical guidance on applying manual handling techniques specifically for electrical work environments, focusing on real-world scenarios you'll encounter in your career."
        keyPoints={[
          "Practical application of TILE principles to electrical materials",
          "Identifying and managing common electrical work handling challenges",
          "Proper use of mechanical aids for electrical equipment",
          "Team lifting techniques for electrical components"
        ]}
        icon="tools"
        subsectionId={subsectionId}
      />
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">Practical TILE Assessment</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Apply the TILE framework to real electrical work scenarios:</p>
            
            <div className="space-y-4 mt-4">
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white flex items-center">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-elec-yellow text-elec-dark font-bold text-sm mr-2">T</span>
                  Task Assessment
                </h4>
                <div className="pl-8 mt-2 space-y-2">
                  <p className="text-elec-light/90">Before handling electrical components, evaluate:</p>
                  <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                    <li>Does the task require awkward positioning in tight spaces?</li>
                    <li>How long must the item be carried or held?</li>
                    <li>Will the task require repetitive movements?</li>
                    <li>Is precision placement needed for heavy items?</li>
                    <li>Can the task be broken down into smaller components?</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white flex items-center">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-elec-yellow text-elec-dark font-bold text-sm mr-2">I</span>
                  Individual Capability
                </h4>
                <div className="pl-8 mt-2 space-y-2">
                  <p className="text-elec-light/90">Consider your personal limitations:</p>
                  <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                    <li>Are you trained in specific handling techniques for electrical equipment?</li>
                    <li>Do you have any temporary or permanent conditions affecting handling ability?</li>
                    <li>Are you familiar with the specific weight distribution of this equipment?</li>
                    <li>Do you need additional PPE that might affect handling (e.g., gloves, safety boots)?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white flex items-center">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-elec-yellow text-elec-dark font-bold text-sm mr-2">L</span>
                  Load Characteristics
                </h4>
                <div className="pl-8 mt-2 space-y-2">
                  <p className="text-elec-light/90">Evaluate electrical equipment specifics:</p>
                  <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                    <li>Is the load unusually shaped with poor grip points (e.g., consumer units, trunking)?</li>
                    <li>Does the item have an uneven weight distribution (e.g., transformers, long cables)?</li>
                    <li>Is the equipment fragile or contains sensitive components?</li>
                    <li>What are the actual dimensions and weight of the item?</li>
                    <li>Are there sharp edges or exposed parts that require careful handling?</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white flex items-center">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-elec-yellow text-elec-dark font-bold text-sm mr-2">E</span>
                  Environment
                </h4>
                <div className="pl-8 mt-2 space-y-2">
                  <p className="text-elec-light/90">Assess workplace conditions:</p>
                  <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                    <li>Are there space constraints affecting movement (e.g., plant rooms, loft spaces)?</li>
                    <li>Are there slip/trip hazards along transport routes?</li>
                    <li>Is lighting sufficient to see obstacles and hazards?</li>
                    <li>Are there temperature extremes that could affect grip or exertion?</li>
                    <li>Will the public or other workers create additional hazards?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Handling Specific Electrical Materials</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-elec-gray/50 p-4 rounded-lg">
            <h4 className="font-medium text-white">Cable Drums</h4>
            <div className="mt-2 space-y-3">
              <p className="text-elec-light/90">Safe handling techniques:</p>
              <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                <li>Use proper drum handling equipment for large reels</li>
                <li>Roll drums on their edge, not flat sides</li>
                <li>Secure drums to prevent uncontrolled movement</li>
                <li>Use cable dispensing equipment for long pulls</li>
                <li>Never use damaged drums or flanges</li>
              </ul>
              <p className="text-sm text-elec-light/70 italic">Common hazard: Back injuries from improper lifting or rolling techniques</p>
            </div>
          </div>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg">
            <h4 className="font-medium text-white">Distribution Boards</h4>
            <div className="mt-2 space-y-3">
              <p className="text-elec-light/90">Safe handling techniques:</p>
              <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                <li>Always use two people for boards over 25kg</li>
                <li>Use handling straps with cushioned grips</li>
                <li>Keep the load close to the body</li>
                <li>Plan the route and clear obstacles first</li>
                <li>Protect corners and edges during transport</li>
              </ul>
              <p className="text-sm text-elec-light/70 italic">Common hazard: Finger injuries from sharp metal edges</p>
            </div>
          </div>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg">
            <h4 className="font-medium text-white">Conduit and Trunking</h4>
            <div className="mt-2 space-y-3">
              <p className="text-elec-light/90">Safe handling techniques:</p>
              <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                <li>Use shoulder carrying techniques for long lengths</li>
                <li>Get assistance for lengths over 3 metres</li>
                <li>Be aware of swing radius in confined spaces</li>
                <li>Use gloves to protect from sharp cut ends</li>
                <li>Support weight at multiple points to prevent bending</li>
              </ul>
              <p className="text-sm text-elec-light/70 italic">Common hazard: Cuts from freshly cut edges and collision injuries</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Practical Exercise: Team Lifting</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            Team lifting requires coordination and communication. Practice these techniques with a partner using a simulation or lightweight object:
          </p>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg my-4">
            <h4 className="font-medium text-white">Team Lifting Procedure</h4>
            <ol className="list-decimal pl-5 mt-2 space-y-2 text-elec-light/80">
              <li className="pl-2">
                <span className="font-medium text-white">Preparation</span>
                <ul className="list-disc pl-5 mt-1 text-elec-light/80">
                  <li>Select team members of similar height if possible</li>
                  <li>Agree on commands and signals before starting</li>
                  <li>Designate one person as the leader who will give instructions</li>
                  <li>Plan the route and check for obstacles</li>
                </ul>
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Positioning</span>
                <ul className="list-disc pl-5 mt-1 text-elec-light/80">
                  <li>Position team members at opposite ends or sides of the load</li>
                  <li>Stand with feet shoulder-width apart, one foot slightly forward</li>
                  <li>All team members should crouch down, not bend at the waist</li>
                  <li>Grip the load securely at corners or dedicated lifting points</li>
                </ul>
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Communication</span>
                <ul className="list-disc pl-5 mt-1 text-elec-light/80">
                  <li>Use clear commands: "Ready", "Lift", "Walk", "Stop", "Down"</li>
                  <li>The leader counts "1-2-3-Lift" to synchronize the movement</li>
                  <li>Communicate any issues immediately (slipping grip, pain)</li>
                  <li>Maintain constant verbal contact during the entire operation</li>
                </ul>
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Execution</span>
                <ul className="list-disc pl-5 mt-1 text-elec-light/80">
                  <li>Lift simultaneously using leg muscles, keeping backs straight</li>
                  <li>Move at a pace comfortable for all team members</li>
                  <li>Take small steps and avoid sudden movements</li>
                  <li>Lower the load using the reverse procedure</li>
                </ul>
              </li>
            </ol>
          </div>
          
          <p className="text-elec-light/90">
            Practice this procedure with a lightweight item before attempting with actual electrical equipment. Focus on coordination and communication between team members.
          </p>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Using Mechanical Aids</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="font-medium text-white">Common Mechanical Aids for Electrical Work:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-elec-light/80">
              <li>
                <span className="font-medium text-white">Cable Pulling Equipment</span>
                <p className="text-sm mt-1">
                  Reduces physical strain during cable installation. Ensure correct setup and tension limits.
                </p>
              </li>
              <li>
                <span className="font-medium text-white">Platform Trolleys</span>
                <p className="text-sm mt-1">
                  Ideal for moving distribution boards and heavy equipment. Ensure even load distribution and use wheel locks when stationary.
                </p>
              </li>
              <li>
                <span className="font-medium text-white">Stair Climbing Trolleys</span>
                <p className="text-sm mt-1">
                  For moving equipment between floors. Requires training and proper strapping techniques.
                </p>
              </li>
              <li>
                <span className="font-medium text-white">Portable Hoists</span>
                <p className="text-sm mt-1">
                  For lifting equipment to height. Inspect rigging components before each use and never exceed rated capacity.
                </p>
              </li>
              <li>
                <span className="font-medium text-white">Pallet Trucks</span>
                <p className="text-sm mt-1">
                  For moving palletised materials. Ensure forks are fully inserted and load is balanced.
                </p>
              </li>
            </ul>
          </div>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg">
            <h4 className="font-medium text-white">Mechanical Aid Safety Checklist:</h4>
            <ol className="list-decimal pl-5 mt-2 space-y-2 text-elec-light/80">
              <li>Inspect equipment before use for damage or wear</li>
              <li>Verify weight capacity is suitable for the load</li>
              <li>Ensure operators are trained on specific equipment</li>
              <li>Clear the planned route of obstacles and hazards</li>
              <li>Use additional spotters for large loads or limited visibility</li>
              <li>Secure the load properly before movement</li>
              <li>Move at a controlled pace, especially on inclines</li>
              <li>Never leave loaded equipment unattended</li>
              <li>Follow manufacturer's guidance for specific equipment</li>
              <li>Report and tag any equipment issues immediately</li>
            </ol>
            <p className="text-elec-light/90 mt-4">
              Always remember: Using mechanical aids incorrectly can create additional hazards. Proper training is essential.
            </p>
          </div>
        </div>
      </div>
      
      {/* Completion Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className={`${
            isCompleted
              ? "bg-green-600/20 border-green-500/50 text-green-400"
              : "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          } px-4 py-2 rounded-lg`}
        >
          {isCompleted ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as Complete"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Subsection7_3;
