import { Lightbulb } from 'lucide-react';

interface SEOKeyTakeawaysProps {
  takeaways: string[];
  heading?: string;
}

export function SEOKeyTakeaways({ takeaways, heading = 'Key Takeaways' }: SEOKeyTakeawaysProps) {
  return (
    <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        <h2 className="font-bold text-white text-lg">{heading}</h2>
      </div>
      <ul className="space-y-3">
        {takeaways.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-white text-sm leading-relaxed">
            <span className="w-5 h-5 rounded-full bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-xs font-bold text-yellow-400 shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span className="flex-1 text-left">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
