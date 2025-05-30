
import { useIsMobile } from "@/hooks/use-mobile";

const ToolboxTips = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return null;
  }

  return (
    <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-medium text-elec-yellow mb-2">Essential Guidance for Apprentices</h3>
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li>Use the chat feature to get instant help with electrical questions and problems</li>
        <li>Refer to the safety fundamentals regularly - safety should always be your top priority</li>
        <li>Explore career progression options early to plan your professional development</li>
        <li>Take advantage of the calculators to understand practical applications of electrical theory</li>
      </ul>
    </div>
  );
};

export default ToolboxTips;
