
import React from 'react';
import { SubsectionProps } from './subsection1_1/types';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield } from 'lucide-react';
import CourseContentSection from '@/components/apprentice/CourseContentSection';

const Subsection7_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Main header with background */}
      <div className="bg-elec-dark border border-elec-yellow/30 rounded-lg p-5">
        <h2 className="text-2xl md:text-3xl font-bold text-elec-yellow">Practical PPE Selection & Use</h2>
        <p className="mt-2 text-elec-light/80">
          Hands-on guidance for selecting and using appropriate PPE in electrical work
        </p>
      </div>
      
      {/* Introduction Section */}
      <CourseContentSection
        title="Practical PPE Application"
        description="Understanding how to select, inspect, wear and maintain personal protective equipment is essential for electrical safety. This section provides practical guidance on using PPE effectively in real-world electrical work environments."
        keyPoints={[
          "Developing consistent PPE habits for electrical work",
          "Practical selection criteria for different tasks",
          "Proper inspection techniques to ensure PPE integrity",
          "Creating a personal PPE maintenance routine"
        ]}
        icon="shield"
        subsectionId={subsectionId}
      />
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">Task-Based PPE Selection</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Apply these practical guidelines when selecting PPE for electrical tasks:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse my-4">
                <thead>
                  <tr className="bg-elec-yellow/20 text-left">
                    <th className="p-3 border border-elec-yellow/30">Task Type</th>
                    <th className="p-3 border border-elec-yellow/30">Essential PPE</th>
                    <th className="p-3 border border-elec-yellow/30">Additional Considerations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-elec-yellow/30">Live testing</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>Class 0 insulating gloves</li>
                        <li>Safety glasses/face shield</li>
                        <li>Non-conductive helmet</li>
                        <li>Arc-rated clothing</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Always verify glove class against voltage levels. Consider flash protection boundaries.
                    </td>
                  </tr>
                  <tr className="bg-elec-gray">
                    <td className="p-3 border border-elec-yellow/30">Cable installation</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>Cut-resistant gloves</li>
                        <li>Safety boots</li>
                        <li>Eye protection</li>
                        <li>Knee pads</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Consider high-visibility clothing in dark areas or spaces with vehicular traffic.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-elec-yellow/30">Overhead work</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>Hard hat with chin strap</li>
                        <li>Fall protection</li>
                        <li>Tool lanyards</li>
                        <li>Full-body harness</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Ensure all tools are secured. Consider weather conditions and sun protection for outdoor work.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">PPE Inspection Process</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Follow these practical inspection routines before each use:</p>
            
            <div className="space-y-4">
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white">Insulating Gloves</h4>
                <ol className="list-decimal pl-5 mt-2 space-y-1 text-elec-light/80">
                  <li>Roll gloves from cuff to fingers to trap air inside</li>
                  <li>Squeeze to check for punctures or air leaks</li>
                  <li>Inspect for discoloration, cracks, or chemical damage</li>
                  <li>Check date stamps for certification expiry</li>
                  <li>Ensure gloves are completely dry inside and out</li>
                </ol>
              </div>
              
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white">Safety Helmets</h4>
                <ol className="list-decimal pl-5 mt-2 space-y-1 text-elec-light/80">
                  <li>Check shell for cracks, dents or chemical damage</li>
                  <li>Examine suspension system for wear or damaged straps</li>
                  <li>Confirm expiry date hasn't passed (typically 2-5 years from manufacture)</li>
                  <li>Ensure proper fit and adjustability</li>
                  <li>Replace after any significant impact even if no visible damage</li>
                </ol>
              </div>
              
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white">Eye Protection</h4>
                <ol className="list-decimal pl-5 mt-2 space-y-1 text-elec-light/80">
                  <li>Look for scratches or damage that could impair vision</li>
                  <li>Check frames for cracks or deformation</li>
                  <li>Ensure straps or arms have good elasticity and tension</li>
                  <li>Verify seal integrity for chemical splash goggles</li>
                  <li>Clean with appropriate solutions only (avoid harsh chemicals)</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">PPE Practical Exercise: Arc Flash Protection</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            Understanding arc flash protection categories is essential for electrical workers. This exercise helps you apply theoretical knowledge to practical scenarios:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-white">Arc Flash Categories Review:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-elec-light/80">
                <li>
                  <span className="font-medium text-white">Category 1:</span> Minimum 4 cal/cm² protection
                  <br />
                  <span className="text-sm">Tasks: Meter reading, operating switches with covers on</span>
                </li>
                <li>
                  <span className="font-medium text-white">Category 2:</span> Minimum 8 cal/cm² protection
                  <br />
                  <span className="text-sm">Tasks: Opening panel covers, working on control circuits &le;240V</span>
                </li>
                <li>
                  <span className="font-medium text-white">Category 3:</span> Minimum 25 cal/cm² protection
                  <br />
                  <span className="text-sm">Tasks: Inserting breakers, working inside panels &le;600V</span>
                </li>
                <li>
                  <span className="font-medium text-white">Category 4:</span> Minimum 40 cal/cm² protection
                  <br />
                  <span className="text-sm">Tasks: Working on exposed energized conductors &gt;600V</span>
                </li>
              </ul>
            </div>
          
            <div className="bg-elec-gray/50 p-4 rounded-lg">
              <h4 className="font-semibold text-white">Practical Application Exercise:</h4>
              <p className="mt-2 text-elec-light/90">
                You are assigned to work on an industrial panel containing 415V equipment. The task involves testing circuits while the panel remains energized. The calculated incident energy is 7.5 cal/cm².
              </p>
              
              <div className="mt-4 space-y-2">
                <p className="font-medium text-white">Consider and document:</p>
                <ol className="list-decimal pl-5 space-y-1 text-elec-light/80">
                  <li>Which category of PPE is required for this task?</li>
                  <li>List all specific PPE components needed</li>
                  <li>What preparation steps would you take before beginning work?</li>
                  <li>How would you ensure your PPE provides adequate protection?</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">PPE Maintenance and Storage</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            Proper PPE maintenance extends equipment life and ensures its effectiveness when needed. Develop these practical habits:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-white">Daily Maintenance:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-elec-light/80">
                <li>Clean PPE after each use with appropriate methods</li>
                <li>Inspect for damage or wear before storing</li>
                <li>Allow items to dry completely before storage</li>
                <li>Replace disposable items like ear plugs</li>
                <li>Follow manufacturer's cleaning instructions</li>
              </ul>
              
              <h4 className="font-semibold text-white mt-4">Weekly Routine:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-elec-light/80">
                <li>Conduct thorough inspections of all PPE</li>
                <li>Check expiry dates on dated items</li>
                <li>Verify completeness of PPE kits</li>
                <li>Rotate or replace items showing wear</li>
                <li>Update PPE inventory and order replacements</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Proper Storage Methods:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-elec-light/80">
                <li>
                  <span className="font-medium text-white">Insulating gloves:</span> Store in protective bag away from direct sunlight, sharp objects, and excessive heat/moisture
                </li>
                <li>
                  <span className="font-medium text-white">Safety helmets:</span> Store on clean surface away from sunlight and heat sources to prevent degradation
                </li>
                <li>
                  <span className="font-medium text-white">Arc flash clothing:</span> Hang to prevent creasing, keep away from contaminants and flammable materials
                </li>
                <li>
                  <span className="font-medium text-white">Eye protection:</span> Store in protective case to prevent scratches and damage
                </li>
                <li>
                  <span className="font-medium text-white">General principles:</span> Clean, dry, ventilated storage away from chemicals, tools, and direct sunlight
                </li>
              </ul>
            </div>
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

export default Subsection7_2;
