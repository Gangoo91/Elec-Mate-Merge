import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  cardCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  WHOLESALERS,
  wholesalerInfo,
  useSaveSupplierConnection,
  useRemoveSupplierConnection,
  type SupplierConnection,
  type WholesalerKey,
} from '@/hooks/useWholesalers';

/* ==========================================================================
   Add or edit a wholesaler trade account (ELE-2066). Owner/admin only.

   The account number and order email also go on the firm's supplier row,
   so purchase orders reach the right inbox with the account number on them.
   The right-hand column says plainly how this wholesaler hands over prices:
   there is no live link, so it is a price file every time.
   ========================================================================== */

const ALERTS = [3, 5, 10];

export function WholesalerAccountSheet({
  open,
  onOpenChange,
  account,
  taken,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** null = a new account. */
  account: SupplierConnection | null;
  /** Wholesalers the firm already has an account for. */
  taken: WholesalerKey[];
  onSaved?: (id: string) => void;
}) {
  const save = useSaveSupplierConnection();
  const remove = useRemoveSupplierConnection();
  const [wholesaler, setWholesaler] = useState<WholesalerKey>('cef');
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(5);
  const [confirmRemove, setConfirmRemove] = useState(false);

  useEffect(() => {
    if (!open) return;
    setConfirmRemove(false);
    if (account) {
      setWholesaler(account.wholesaler);
      setName(account.display_name);
      setNameTouched(true);
      setAccountNumber(account.account_number ?? '');
      setBranch(account.branch ?? '');
      setEmail(account.order_email ?? '');
      setAlert(account.price_alert_pct || 5);
    } else {
      const first =
        WHOLESALERS.find((w) => w.key !== 'other' && !taken.includes(w.key)) ?? WHOLESALERS[0];
      setWholesaler(first.key);
      setName(first.defaultName);
      setNameTouched(false);
      setAccountNumber('');
      setBranch('');
      setEmail('');
      setAlert(5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, account?.id]);

  const info = wholesalerInfo(wholesaler);
  const emailOk = email.trim() === '' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
  const canSave = name.trim().length > 0 && emailOk && !save.isPending;

  const pick = (k: WholesalerKey) => {
    setWholesaler(k);
    if (!nameTouched || name.trim() === '') setName(wholesalerInfo(k).defaultName);
  };

  const submit = async () => {
    if (!canSave) return;
    try {
      const id = await save.mutateAsync({
        id: account?.id ?? null,
        wholesaler,
        display_name: name.trim(),
        account_number: accountNumber.trim() || null,
        branch: branch.trim() || null,
        order_email: email.trim() || null,
        price_alert_pct: alert,
      });
      toast.success(account ? 'Account saved' : `${name.trim()} added`);
      onOpenChange(false);
      onSaved?.(id);
    } catch (e) {
      toast.error((e as { message?: string })?.message || 'Could not save the account');
    }
  };

  const doRemove = async () => {
    if (!account) return;
    try {
      await remove.mutateAsync(account.id);
      toast.success('Account removed. The supplier and its orders stay.');
      onOpenChange(false);
    } catch (e) {
      toast.error((e as { message?: string })?.message || 'Could not remove the account');
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Wholesaler account"
      title={account ? account.display_name : 'Add a wholesaler account'}
      description="Your account details, so prices and purchase orders line up with your trade account."
      bodyClassName="space-y-5 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:space-y-0"
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonSecondaryCn, 'flex-1 px-4')}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!canSave}
            className={cn(buttonPrimaryCn, 'flex-[2] px-4')}
          >
            {save.isPending ? 'Saving…' : account ? 'Save account' : 'Add account'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <section className={cardCn}>
          <h2 className="text-[15px] font-semibold text-white">Wholesaler</h2>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {WHOLESALERS.map((w) => (
              <button
                key={w.key}
                type="button"
                onClick={() => pick(w.key)}
                aria-pressed={wholesaler === w.key}
                className={cn(
                  chipBase,
                  'px-2 text-[13.5px]',
                  wholesaler === w.key ? chipOn : chipOff
                )}
              >
                {w.label}
              </button>
            ))}
          </div>
          <div>
            <label className={labelCn} htmlFor="ws-name">
              Name on your list
            </label>
            <input
              id="ws-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameTouched(true);
              }}
              maxLength={120}
              placeholder="e.g. CEF Leeds"
              className={inputCn}
            />
          </div>
        </section>

        <section className={cardCn}>
          <h2 className="text-[15px] font-semibold text-white">Your trade account</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label className={labelCn} htmlFor="ws-acct">
                Account number
              </label>
              <input
                id="ws-acct"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                maxLength={60}
                autoComplete="off"
                placeholder="On your statements"
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="ws-branch">
                Branch
              </label>
              <input
                id="ws-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                maxLength={120}
                placeholder="e.g. Leeds Kirkstall Road"
                className={inputCn}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCn} htmlFor="ws-email">
                Order email
              </label>
              <input
                id="ws-email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="The branch address that takes orders"
                className={inputCn}
              />
              {!emailOk ? (
                <p className="mt-1 text-[12.5px] font-medium text-red-400">
                  That email does not look right.
                </p>
              ) : (
                <p className="mt-1 text-[12.5px] text-white">
                  Purchase orders you send go here, with your account number on them.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className={cardCn}>
          <h2 className="text-[15px] font-semibold text-white">Flag a price move from</h2>
          <div className="grid grid-cols-3 gap-2">
            {ALERTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAlert(a)}
                aria-pressed={alert === a}
                className={cn(chipBase, 'px-3', alert === a ? chipOn : chipOff)}
              >
                {a}%
              </button>
            ))}
          </div>
          <p className="text-[13px] text-white">
            A new price file that moves a price by this much or more is flagged, and so are open
            quotes that use the item.
          </p>
        </section>
      </div>

      <aside className="space-y-5">
        <section className={cardCn}>
          <h2 className="text-[15px] font-semibold text-white">
            How {info.key === 'other' ? 'this wholesaler' : info.label} works with Elec-Mate
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-[13px] font-semibold text-white">Prices</p>
              <p className="mt-0.5 text-[13.5px] leading-snug text-white">{info.prices}</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white">Orders</p>
              <p className="mt-0.5 text-[13.5px] leading-snug text-white">{info.orders}</p>
            </div>
            <div className="border-t border-white/[0.1] pt-3">
              <p className="text-[13px] font-semibold text-white">Live link</p>
              <p className="mt-0.5 text-[13.5px] leading-snug text-white">
                Not yet. Elec-Mate has no live price link with any wholesaler, so prices come in as
                a file you import. Import a new file whenever the branch sends one.
              </p>
            </div>
          </div>
        </section>

        {account && (
          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">Remove this account</h2>
            <p className="text-[13px] text-white">
              The supplier, its purchase orders and the price history stay. Price files stop.
            </p>
            {confirmRemove ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmRemove(false)}
                  className={cn(buttonSecondaryCn, 'flex-1 px-4')}
                >
                  Keep it
                </button>
                <button
                  type="button"
                  onClick={doRemove}
                  disabled={remove.isPending}
                  className="h-12 flex-1 rounded-xl bg-red-500 px-4 text-[14px] font-semibold text-white touch-manipulation disabled:opacity-60"
                >
                  {remove.isPending ? 'Removing…' : 'Remove'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmRemove(true)}
                className="h-11 text-[14px] font-semibold text-red-400 touch-manipulation"
              >
                Remove account
              </button>
            )}
          </section>
        )}
      </aside>
    </FormSheet>
  );
}

export default WholesalerAccountSheet;
