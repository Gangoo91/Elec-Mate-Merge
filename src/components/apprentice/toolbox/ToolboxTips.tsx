
import { useIsMobile } from "@/hooks/use-mobile";

const ToolboxTips = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return null;
  }

  return (
    <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-medium text-elec-yellow mb-2">Top Tips for New Apprentices</h3>
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li>Always carry a voltage tester and use it before working on circuits</li>
        <li>Keep a notebook for recording important information on site</li>
        <li>Ask questions - experienced electricians are usually happy to share knowledge</li>
        <li>Invest in quality tools that will last throughout your apprenticeship</li>
      </ul>
    </div>
  );
};

export default ToolboxTips;
