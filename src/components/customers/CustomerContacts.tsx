import React, { useState } from 'react';
import { useCustomerContacts, ContactInput } from '@/hooks/useCustomerContacts';
import { Pill } from '@/components/college/primitives';

interface Props {
  customerId: string;
}

const ROLE_SUGGESTIONS = [
  'Site manager',
  'Billing',
  'Decision maker',
  'Project manager',
  'Foreman',
  'Letting agent',
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

export const CustomerContacts: React.FC<Props> = ({ customerId }) => {
  const { contacts, addContact, deleteContact } = useCustomerContacts(customerId);
  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState<ContactInput>({ name: '', role: '', email: '', phone: '' });

  const handleAdd = async () => {
    if (!draft.name.trim()) return;
    await addContact(draft);
    setDraft({ name: '', role: '', email: '', phone: '' });
    setAddOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Contacts</h3>
          <p className="mt-0.5 text-[12.5px] text-white/55">
            {contacts.length === 0
              ? 'No additional contacts'
              : `${contacts.length} contact${contacts.length === 1 ? '' : 's'}`}
          </p>
        </div>
        {!addOpen && (
          <button
            onClick={() => setAddOpen(true)}
            className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 text-[12px] font-medium text-white transition-colors hover:border-elec-yellow/30 hover:bg-elec-yellow/[0.06] hover:text-elec-yellow touch-manipulation"
          >
            Add contact
          </button>
        )}
      </div>

      {addOpen && (
        <div className="space-y-3 rounded-2xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              autoFocus
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Name"
              className="h-10 rounded-lg border border-white/[0.08] bg-[hsl(0_0%_10%)] px-3 text-[13px] text-white placeholder:text-white/35 focus:border-elec-yellow/40 focus:outline-none"
            />
            <input
              value={draft.role || ''}
              onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              placeholder="Role (e.g. site manager)"
              className="h-10 rounded-lg border border-white/[0.08] bg-[hsl(0_0%_10%)] px-3 text-[13px] text-white placeholder:text-white/35 focus:border-elec-yellow/40 focus:outline-none"
            />
            <input
              type="email"
              value={draft.email || ''}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              placeholder="Email"
              className="h-10 rounded-lg border border-white/[0.08] bg-[hsl(0_0%_10%)] px-3 text-[13px] text-white placeholder:text-white/35 focus:border-elec-yellow/40 focus:outline-none"
            />
            <input
              type="tel"
              value={draft.phone || ''}
              onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
              placeholder="Phone"
              className="h-10 rounded-lg border border-white/[0.08] bg-[hsl(0_0%_10%)] px-3 text-[13px] text-white placeholder:text-white/35 focus:border-elec-yellow/40 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Quick role
            </span>
            {ROLE_SUGGESTIONS.map((r) => (
              <button
                key={r}
                onClick={() => setDraft({ ...draft, role: r })}
                className="flex h-7 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 text-[11.5px] font-medium text-white/65 transition-colors hover:border-elec-yellow/30 hover:bg-white/[0.08] hover:text-elec-yellow touch-manipulation"
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setAddOpen(false);
                setDraft({ name: '', role: '', email: '', phone: '' });
              }}
              className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!draft.name.trim()}
              className="flex h-9 items-center rounded-full bg-elec-yellow px-4 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation"
            >
              Save contact
            </button>
          </div>
        </div>
      )}

      {contacts.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] divide-y divide-white/[0.06]">
          {contacts.map((c) => (
            <div key={c.id} className="flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[11.5px] font-semibold text-white">
                {getInitials(c.name)}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14px] font-medium text-white sm:text-[14.5px]">
                    {c.name}
                  </span>
                  {c.role && (
                    <Pill tone="yellow">
                      {c.role}
                    </Pill>
                  )}
                  {c.isPrimary && (
                    <Pill tone="emerald">Primary</Pill>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[12px]">
                  {c.email && (
                    <a
                      href={`mailto:${c.email}`}
                      className="text-white/65 transition-colors hover:text-elec-yellow"
                    >
                      {c.email}
                    </a>
                  )}
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      className="text-white/65 transition-colors hover:text-elec-yellow"
                    >
                      {c.phone}
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteContact(c.id)}
                className="flex h-8 shrink-0 items-center px-2 text-[12px] font-medium text-white/55 transition-colors hover:text-red-400 touch-manipulation"
                aria-label={`Delete ${c.name}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
