import { SmartQuoteBuilder } from "@/components/electrician/quote-builder/SmartQuoteBuilder";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const SmartQuoteBuilderPage = () => {
  return (
    <div className="min-h-screen bg-elec-grey text-foreground pb-safe">
      <div className="w-full mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 pt-safe">
        {/* Navigation */}
        <div className="flex justify-start">
          <SmartBackButton />
        </div>

        {/* Main Content */}
        <SmartQuoteBuilder />
      </div>
    </div>
  );
};

export default SmartQuoteBuilderPage;
