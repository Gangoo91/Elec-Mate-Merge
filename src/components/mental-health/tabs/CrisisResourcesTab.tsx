import { openExternalUrl } from '@/utils/open-external-url';
import { Phone, ExternalLink, MapPin, MessageSquare, Shield, Heart } from 'lucide-react';
import LocalResourceFinder from '@/components/mental-health/crisis/LocalResourceFinder';
import {
  emergencyContacts,
  onlineResources,
} from '@/components/mental-health/crisis/CrisisResourcesData';
import { cn } from '@/lib/utils';

const CrisisResourcesTab = () => {
  const priorityHelplines = emergencyContacts.filter(
    (c) => c.type === 'emergency' || c.type === 'crisis'
  );
  const supportLines = emergencyContacts.filter(
    (c) => c.type === 'support' || c.type === 'specialty'
  );

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
          <Shield className="h-7 w-7 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white">You're not alone</h2>
        <p className="text-sm text-white/80 mt-2 max-w-sm mx-auto leading-relaxed">
          If you feel unsafe or overwhelmed, reach out now. Speed matters — pick the option that feels easiest.
        </p>
      </div>

      {/* Primary actions — big tappable cards */}
      <div className="space-y-3">
        <a
          href="tel:999"
          className="block w-full p-4 rounded-2xl bg-red-500/15 border border-red-500/25 touch-manipulation active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-500/25 flex items-center justify-center flex-shrink-0">
              <Phone className="h-5 w-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-red-300">Call 999</h3>
              <p className="text-xs text-white/80 mt-0.5">Immediate danger or medical emergency</p>
            </div>
          </div>
        </a>

        <a
          href="tel:116123"
          className="block w-full p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
              <Phone className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-white">Call Samaritans 116 123</h3>
              <p className="text-xs text-white/80 mt-0.5">Free 24/7 support — someone to listen</p>
            </div>
          </div>
        </a>

        <a
          href="sms:85258?body=SHOUT"
          className="block w-full p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-white">Text SHOUT to 85258</h3>
              <p className="text-xs text-white/80 mt-0.5">24/7 text support — if speaking feels harder</p>
            </div>
          </div>
        </a>
      </div>

      {/* Encouragement */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/15">
        <Heart className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white/90 leading-relaxed">
          A smaller first step is still a real first step. If calling feels too difficult, start with a text.
        </p>
      </div>

      {/* Crisis helplines */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Crisis & Urgent Support</p>
        {priorityHelplines.map((c) => (
          <a
            key={`${c.name}-${c.phone}`}
            href={`tel:${c.phone.replace(/\s/g, '')}`}
            className="block w-full p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-3">
                <h4 className="text-sm font-semibold text-white">{c.name}</h4>
                <p className="text-[11px] text-white/70 mt-0.5 line-clamp-2">{c.description}</p>
                <p className="text-[10px] text-white/60 mt-1">{c.hours}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-bold text-elec-yellow">{c.phone}</span>
                <Phone className="h-4 w-4 text-elec-yellow" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Local resource finder */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-white/70" />
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Find Local Help</p>
        </div>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
          <LocalResourceFinder />
        </div>
      </div>

      {/* Support lines */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Ongoing Support</p>
        {supportLines.map((c) => (
          <a
            key={`${c.name}-${c.phone}`}
            href={`tel:${c.phone.replace(/\s/g, '')}`}
            className="block w-full p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-3">
                <h4 className="text-sm font-semibold text-white">{c.name}</h4>
                <p className="text-[11px] text-white/70 mt-0.5">{c.description}</p>
              </div>
              <span className="text-xs font-bold text-elec-yellow flex-shrink-0">{c.phone}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Online resources */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Trusted Online Resources</p>
        {onlineResources.map((r) => (
          <button
            key={`${r.name}-${r.url}`}
            onClick={() => openExternalUrl(r.url)}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all text-left"
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white">{r.name}</h4>
              <p className="text-[11px] text-white/70 mt-0.5">{r.description}</p>
            </div>
            <ExternalLink className="h-4 w-4 text-white/60 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CrisisResourcesTab;
