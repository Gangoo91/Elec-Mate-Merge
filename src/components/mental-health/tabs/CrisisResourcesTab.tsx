import { openExternalUrl } from '@/utils/open-external-url';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, MessageSquare, TriangleAlert } from 'lucide-react';
import LocalResourceFinder from '@/components/mental-health/crisis/LocalResourceFinder';
import {
  emergencyContacts,
  onlineResources,
} from '@/components/mental-health/crisis/CrisisResourcesData';

const primaryActions = [
  {
    label: 'Call 999',
    description: 'Immediate danger or medical emergency',
    href: 'tel:999',
    tone: 'border-red-500/30 bg-red-500/[0.08] text-red-200',
  },
  {
    label: 'Call Samaritans 116 123',
    description: 'Free 24/7 support if you need to talk now',
    href: 'tel:116123',
    tone: 'border-white/10 bg-white/[0.04] text-white',
  },
  {
    label: 'Text SHOUT to 85258',
    description: '24/7 text support if speaking feels harder',
    href: 'sms:85258?body=SHOUT',
    tone: 'border-white/10 bg-white/[0.04] text-white',
  },
];

const CrisisResourcesTab = () => {
  const priorityHelplines = emergencyContacts.filter(
    (contact) => contact.type === 'emergency' || contact.type === 'crisis'
  );

  const supportLines = emergencyContacts.filter(
    (contact) => contact.type === 'support' || contact.type === 'specialty'
  );

  return (
    <div className="space-y-6">
      <div className="border-t border-red-500/20 pt-5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <TriangleAlert className="h-6 w-6 text-red-300" />
        </div>
        <h2 className="text-2xl font-semibold text-white">Get help quickly.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/78">
          If you feel unsafe, overwhelmed, or worried about what you might do next, use the fastest
          route to a real person. The goal here is speed and clarity, not more decisions.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {primaryActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className={`border-t p-5 transition-colors hover:opacity-100 ${action.tone}`}
          >
            <p className="text-lg font-semibold">{action.label}</p>
            <p className="mt-2 text-sm leading-6 opacity-80">{action.description}</p>
          </a>
        ))}
      </div>

      <section className="border-t border-white/10 pt-5">
        <h3 className="text-xl font-medium text-white">Crisis and urgent support lines</h3>
        <div className="mt-4 space-y-3">
          {priorityHelplines.map((contact) => (
            <div
              key={`${contact.name}-${contact.phone}`}
              className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="max-w-2xl">
                <h3 className="font-medium text-white">{contact.name}</h3>
                <p className="mt-1 text-sm leading-6 text-white/72">{contact.description}</p>
                <p className="mt-2 text-sm text-white/55">{contact.hours}</p>
              </div>
              <Button
                asChild
                className={contact.type === 'emergency' ? 'bg-red-500 hover:bg-red-600 text-white' : ''}
                variant={contact.type === 'emergency' ? 'default' : 'outline'}
              >
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 pt-5">
        <h3 className="text-xl font-medium text-white">Find local and ongoing help</h3>
        <div className="mt-4 space-y-5">
          <div className="border-b border-white/10 pb-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <MapPin className="h-5 w-5 text-white/72" />
              </div>
              <div>
                <h3 className="font-medium text-white">Local NHS and community support</h3>
                <p className="text-sm text-white/65">Search nearby services when you need something close to home.</p>
              </div>
            </div>
            <LocalResourceFinder />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {supportLines.map((contact) => (
              <div
                key={`${contact.name}-${contact.phone}`}
                className="border-b border-white/10 pb-4"
              >
                <h3 className="font-medium text-white">{contact.name}</h3>
                <p className="mt-1 text-sm leading-6 text-white/72">{contact.description}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-white/55">{contact.hours}</span>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="text-sm font-medium text-elec-yellow"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 pt-5">
        <h3 className="text-xl font-medium text-white">Trusted online resources</h3>
        <div className="mt-4 space-y-2">
          {onlineResources.map((resource) => (
            <button
              key={`${resource.name}-${resource.url}`}
              onClick={() => openExternalUrl(resource.url)}
              className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left transition-colors hover:opacity-100"
            >
              <div className="pr-4">
                <h3 className="font-medium text-white">{resource.name}</h3>
                <p className="mt-1 text-sm leading-6 text-white/72">{resource.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-white/55" />
            </button>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <MessageSquare className="h-4 w-4 text-white/72" />
          </div>
          <p className="text-sm leading-6 text-white/78">
            If calling feels too difficult, use text support first. A smaller first step is still a
            real first step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisResourcesTab;
