/**
 * Apprentice funding and pay on the Apprentices page (ELE-2063). Owner and
 * admins only. For each apprentice on the team: what the firm can claim under
 * the 2026/27 apprenticeship funding rules (England, an employer that does not
 * pay the levy), when it comes, and whether their pay is still above the legal
 * minimum as they turn 19 and pass their first year.
 *
 * Rules: DfE "Apprenticeship funding rules August 2026 to July 2027" v3 —
 * 125/128 (£1,000 incentive), 127.2/129 (care leaver bursary £3,000, to the
 * apprentice), 133/137 (£2,000 hiring payment, practical period from
 * 1 Oct 2026), 214 (16–24 training fully funded). NMW: gov.uk.
 */
import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  Initials,
  KeyValue,
  Row,
  StatusPill,
  rowBtnSecondary,
  rowsClass,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { useEmployees } from '@/hooks/useEmployees';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { usePayProfiles, useStatutoryRates } from '@/hooks/usePayLaw';
import {
  BAND_LABEL,
  apprenticeFunding,
  apprenticeRateEnds,
  checkPay,
  type FundingItem,
  type FundingStatus,
} from '@/lib/payLaw';
import { PayProfileSheet } from '@/components/employer/payLaw/PersonPayLawCard';

const FUNDING_RULES_URL = 'https://www.gov.uk/guidance/apprenticeship-funding-rules';

const STATUS: Record<FundingStatus, { text: string; tone: PillTone }> = {
  eligible: { text: 'Can claim', tone: 'green' },
  check: { text: 'Check', tone: 'neutral' },
  not_eligible: { text: 'Not eligible', tone: 'neutral' },
};

const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM yyyy') : '');
const money = (n: number) => `£${n.toFixed(2)}`;
const FIRM_AMOUNT: Partial<Record<FundingItem['id'], number>> = {
  hiring_payment: 2000,
  incentive: 1000,
};

export function ApprenticeFundingPanel() {
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;
  const { data: employees = [] } = useEmployees();
  const { data: profiles } = usePayProfiles(canSeeMoney);
  const rates = useStatutoryRates();
  const [openId, setOpenId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const today = format(new Date(), 'yyyy-MM-dd');

  const people = useMemo(
    () =>
      employees
        .filter(
          (e) =>
            (e.status || '').toLowerCase() === 'active' &&
            (e.team_role === 'Apprentice' || !!profiles?.get(e.id)?.apprenticeshipStart)
        )
        .map((e) => {
          const p = profiles?.get(e.id);
          const items = apprenticeFunding({
            dob: p?.dateOfBirth,
            apprenticeshipStart: p?.apprenticeshipStart,
            joinDate: e.join_date,
            careLeaver: p?.careLeaver,
            ehcp: p?.ehcp,
            today,
          });
          const hourly =
            e.pay_type === 'hourly' && Number(e.hourly_rate) > 0 ? Number(e.hourly_rate) : null;
          const pay = checkPay(
            rates,
            hourly,
            p?.dateOfBirth,
            p?.apprenticeshipStart,
            today,
            30,
            p?.apprenticeshipEnd
          );
          const claim = items
            .filter((i) => i.status === 'eligible')
            .reduce((s, i) => s + (FIRM_AMOUNT[i.id] ?? 0), 0);
          const missing = !p?.dateOfBirth || !p?.apprenticeshipStart;
          return { emp: e, profile: p, items, pay, claim, missing, hourly };
        }),
    [employees, profiles, rates, today]
  );

  if (!canSeeMoney || people.length === 0) return null;
  const total = people.reduce((s, x) => s + x.claim, 0);
  const opened = people.find((x) => x.emp.id === openId) ?? null;
  const editing = people.find((x) => x.emp.id === editId) ?? null;

  return (
    <section data-help="apprentices.funding">
      <PanelTitle
        title="Apprentice funding"
        meta={total > 0 ? `£${total.toLocaleString()} to claim` : undefined}
      />
      <div className={cn(panel, rowsClass)}>
        {people.map(({ emp, claim, missing, pay }) => (
          <Row
            key={emp.id}
            lead={<Initials name={emp.name} />}
            title={emp.name}
            detail={
              missing
                ? 'Not checked yet'
                : claim > 0
                  ? `£${claim.toLocaleString()} the firm can claim`
                  : 'Nothing more to claim'
            }
            trailing={
              pay.belowNow ? (
                <StatusPill tone="red">Below minimum</StatusPill>
              ) : pay.riseDue ? (
                <StatusPill tone="volt">Pay rise due</StatusPill>
              ) : missing ? (
                <StatusPill tone="neutral">Add dates</StatusPill>
              ) : undefined
            }
            onClick={() => setOpenId(emp.id)}
          />
        ))}
        <p className="px-4 py-3 text-[13px] leading-relaxed text-white sm:px-5">
          For firms in England that do not pay the apprenticeship levy. The money is paid through
          the training provider, so check they have the right start date and your PAYE scheme on the
          apprenticeship service.
        </p>
      </div>

      {opened && (
        <FormSheet
          open
          onOpenChange={(o) => !o && setOpenId(null)}
          width="wide"
          title={opened.emp.name}
          description="What the firm can claim and what they must be paid. From the 2026 to 2027 apprenticeship funding rules and the minimum wage rates."
          footer={
            <div className="flex w-full justify-end gap-2">
              <a
                href={FUNDING_RULES_URL}
                target="_blank"
                rel="noreferrer"
                className={rowBtnSecondary}
              >
                Funding rules
              </a>
              <button
                type="button"
                onClick={() => {
                  setEditId(opened.emp.id);
                  setOpenId(null);
                }}
                className="inline-flex h-11 items-center justify-center rounded-full bg-elec-yellow px-8 text-[14px] font-semibold text-black touch-manipulation"
              >
                Edit dates
              </button>
            </div>
          }
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <section className="space-y-3">
              <h3 className="text-[15px] font-semibold text-white">Money you can claim</h3>
              <div className={cn(panel, rowsClass)}>
                {opened.items.map((i) => (
                  <div key={i.id} className="px-4 py-3 sm:px-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[15px] font-semibold text-white">
                          {i.title} · {i.amount}
                        </div>
                        <div className="mt-0.5 text-[13px] leading-snug text-white">{i.reason}</div>
                        {i.when && (
                          <div className="mt-1 text-[13px] leading-snug text-white">{i.when}</div>
                        )}
                        <div className="mt-1 text-[12px] text-white">{i.rule}</div>
                      </div>
                      <StatusPill tone={STATUS[i.status].tone}>{STATUS[i.status].text}</StatusPill>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-[15px] font-semibold text-white">Their pay</h3>
              <div className={cn(panel, 'overflow-hidden')}>
                <div className={rowsClass}>
                  <KeyValue
                    label="Date of birth"
                    value={
                      opened.profile?.dateOfBirth ? nice(opened.profile.dateOfBirth) : 'Not set'
                    }
                  />
                  <KeyValue
                    label="Apprenticeship start"
                    value={
                      opened.profile?.apprenticeshipStart
                        ? nice(opened.profile.apprenticeshipStart)
                        : 'Not set'
                    }
                  />
                  <KeyValue
                    label={
                      opened.pay.today
                        ? `Minimum today (${BAND_LABEL[opened.pay.today.band].toLowerCase()})`
                        : 'Minimum today'
                    }
                    value={
                      opened.pay.today ? `${money(opened.pay.today.rate)} an hour` : 'Add dates'
                    }
                    tone={opened.pay.belowNow ? 'red' : undefined}
                  />
                  {opened.hourly !== null && (
                    <KeyValue
                      label="Their rate"
                      value={`${money(opened.hourly)} an hour`}
                      tone={opened.pay.belowNow ? 'red' : undefined}
                    />
                  )}
                  {opened.profile?.dateOfBirth && opened.profile.apprenticeshipStart && (
                    <KeyValue
                      label="Apprentice rate ends"
                      value={nice(
                        apprenticeRateEnds(
                          opened.profile.dateOfBirth,
                          opened.profile.apprenticeshipStart,
                          opened.profile.apprenticeshipEnd
                        )
                      )}
                    />
                  )}
                  {opened.pay.riseDue && (
                    <KeyValue
                      label={`From ${nice(opened.pay.riseDue.on)}`}
                      value={`${money(opened.pay.riseDue.min.rate)} minimum`}
                      tone="yellow"
                    />
                  )}
                </div>
              </div>
              <p className="text-[13px] leading-snug text-white">
                The apprentice rate is for under 19s, and for anyone in the first year of their
                apprenticeship. After that they move to the rate for their age. You get a bell a
                month before it changes, and each April when the rates go up.
              </p>
            </section>
          </div>
        </FormSheet>
      )}

      {editing && (
        <PayProfileSheet
          open
          onOpenChange={(o) => !o && setEditId(null)}
          person={{ id: editing.emp.id, name: editing.emp.name }}
          firstName={editing.emp.name.split(' ')[0] || 'They'}
          isApprentice
        />
      )}
    </section>
  );
}
