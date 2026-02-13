import { WifiOff, Brain, Clock, BookCheck, Calculator, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    icon: Brain,
    title: 'AI Trained for UK Electrical',
    description:
      'Not a generic chatbot. 8 Elec-AI specialists trained specifically on BS 7671:2018+A3:2024, GN3, CDM 2015, and thousands of real UK electrical scenarios.',
  },
  {
    icon: WifiOff,
    title: 'Works Offline, On Site',
    description:
      'No signal in a basement? On a scaffold? In a plant room? Elec-Mate works offline. YouTube and Google don\u2019t.',
  },
  {
    icon: Clock,
    title: 'Always Up to Date',
    description:
      'YouTube videos from 2019 still reference the 17th Edition. Elec-Mate is updated to BS 7671:2018+A3:2024 (Amendment 3, issued July 2024).',
  },
  {
    icon: Calculator,
    title: 'Calculations Done for You',
    description:
      '70 calculators with all BS 7671 tables built in. No manual formula work, no spreadsheet errors, no hunting through Appendix 4.',
  },
  {
    icon: BookCheck,
    title: 'Everything in One Place',
    description:
      'Certificates, calculators, training, AI tools, business management \u2014 all integrated. No jumping between 10 different websites and apps.',
  },
  {
    icon: ShieldCheck,
    title: 'Professional Output',
    description:
      'Generate BS 7671 compliant certificates, RAMS, cost estimates, and PDF reports automatically. Try doing that from a YouTube tutorial.',
  },
];

export function SEOWhyNotGoogle() {
  return (
    <section className="py-12 sm:py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Why Elec-Mate, Not YouTube or Google?
          </h2>
          <p className="text-white max-w-2xl mx-auto leading-relaxed">
            Free resources are great for learning. But when you&apos;re on site, quoting a job, or
            filling in a certificate, you need tools that work \u2014 not a 45-minute video.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/8"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-blue-500/10 border border-blue-500/20">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">{reason.title}</h3>
                <p className="text-sm text-white leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
