import { SmartBackButton } from '@/components/ui/smart-back-button';
import { ReactNode } from 'react';

interface MentalHealthPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  icon: ReactNode;
  color?: string;
}

const MentalHealthPageLayout = ({
  title,
  description,
  children,
  icon,
  color = 'purple',
}: MentalHealthPageLayoutProps) => {
  const colorClasses = {
    purple: 'border-purple-500/20 from-purple-500/12 via-purple-500/6 to-transparent',
    yellow: 'border-elec-yellow/20 from-elec-yellow/12 via-elec-yellow/6 to-transparent',
    green: 'border-green-500/20 from-green-500/12 via-green-500/6 to-transparent',
    red: 'border-red-500/20 from-red-500/12 via-red-500/6 to-transparent',
    blue: 'border-blue-500/20 from-blue-500/12 via-blue-500/6 to-transparent',
    orange: 'border-orange-500/20 from-orange-500/12 via-orange-500/6 to-transparent',
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      <div className="pt-2 mb-5">
        <SmartBackButton />
      </div>

      <div className="relative px-1 py-2">
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent`} />
        <div className="absolute -right-20 top-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl py-4">
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]}`}>
              {icon}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78 sm:text-base">
              {description}
            </p>
          </div>

          <div className="max-w-sm border-l border-white/10 pl-4 text-sm text-white/78">
            <p className="font-medium text-white">Take what helps. Leave what doesn&apos;t.</p>
            <p className="mt-1">This space is designed to feel calmer, clearer and easier to use when you need it.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6 sm:pt-8">{children}</div>
    </div>
  );
};

export default MentalHealthPageLayout;
