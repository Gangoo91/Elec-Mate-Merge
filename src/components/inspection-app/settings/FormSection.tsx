import { LucideIcon } from "lucide-react";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ icon: Icon, title, description, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b border-elec-gray-light">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-gray-300 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
