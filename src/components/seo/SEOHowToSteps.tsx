interface HowToStep {
  name: string;
  text: string;
}

interface SEOHowToStepsProps {
  steps: HowToStep[];
  heading?: string;
  description?: string;
}

export function SEOHowToSteps({ steps, heading, description }: SEOHowToStepsProps) {
  return (
    <div>
      {heading && <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{heading}</h2>}
      {description && <p className="text-white mb-8 leading-relaxed">{description}</p>}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.name}
            className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              {index + 1}
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
              <p className="text-white text-sm leading-relaxed">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
