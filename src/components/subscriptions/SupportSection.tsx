import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SupportSection = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 py-4 border-t border-white/[0.06]">
      <span className="text-xs text-white/30 shrink-0">Need help?</span>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <a
          href="mailto:info@elec-mate.com?subject=Subscription%20Support"
          className={cn(
            "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm touch-manipulation min-h-[44px]",
            "text-white/60 hover:text-foreground hover:bg-white/[0.04] active:scale-[0.98]",
            "transition-all duration-200"
          )}
        >
          <Mail className="h-3.5 w-3.5 text-blue-400" />
          Email Support
          <ArrowRight className="h-3 w-3 text-white/20" />
        </a>

        <a
          href="mailto:info@elec-mate.com?subject=Live%20Chat%20Request"
          className={cn(
            "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm touch-manipulation min-h-[44px]",
            "text-white/60 hover:text-foreground hover:bg-white/[0.04] active:scale-[0.98]",
            "transition-all duration-200"
          )}
        >
          <MessageCircle className="h-3.5 w-3.5 text-green-400" />
          Live Chat
          <ArrowRight className="h-3 w-3 text-white/20" />
        </a>
      </div>

      <span className="text-[11px] text-white/20 sm:ml-auto">
        Billing:{" "}
        <a href="mailto:info@elec-mate.com" className="text-white/40 hover:text-elec-yellow touch-manipulation">
          info@elec-mate.com
        </a>
      </span>
    </div>
  );
};

export default SupportSection;
