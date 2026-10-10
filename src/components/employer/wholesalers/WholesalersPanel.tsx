import { useMemo, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import {
  TwoColumn,
  PanelHead,
  PlainEmpty,
  StatusPill,
  panelShellClass,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { gbp } from '@/hooks/useFirmPriceBook';
import {
  useSupplierConnections,
  useFirmPriceMoves,
  type SupplierConnection,
} from '@/hooks/useWholesalers';
import { WholesalerAccountSheet } from './WholesalerAccountSheet';
import { PriceFileImportSheet } from './PriceFileImportSheet';
import { BillsAddressPanel } from './BillsAddressPanel';

/* ==========================================================================
   Price book › Wholesalers (ELE-2066). Owner/admin only.

   Left: the firm's wholesaler accounts (each with its last price file) and
   the price moves those files brought in, with how many open quotes use
   the item. Right: how prices get here, said plainly: a file import, not
   a live link.
   ========================================================================== */

const ago = (iso: string | null | undefined) =>
  iso ? formatDistanceToNowStrict(new Date(iso), { addSuffix: true }) : null;

const pct = (v: number) =>
  `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v) < 1 ? Math.abs(v).toFixed(1) : Math.round(Math.abs(v))}%`;

export function WholesalersPanel() {
  const { data: accounts = [], isLoading, isError, refetch } = useSupplierConnections();
  const { data: moves = [], isLoading: movesLoading } = useFirmPriceMoves();
  const [editing, setEditing] = useState<SupplierConnection | null>(null);
  const [showAccount, setShowAccount] = useState(false);
  const [importFor, setImportFor] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [allMoves, setAllMoves] = useState(false);

  const big = useMemo(() => moves.filter((m) => m.big), [moves]);
  const shownMoves = allMoves ? moves : (big.length > 0 ? big : moves).slice(0, 8);

  const openNew = () => {
    setEditing(null);
    setShowAccount(true);
  };
  const openImport = (id: string | null) => {
    setImportFor(id);
    setShowImport(true);
  };

  const main = (
    <>
      <section className={panelShellClass}>
        <PanelHead
          title="Wholesaler accounts"
          meta={
            accounts.length > 0 ? (
              <span className="text-[13px] text-white">{accounts.length}</span>
            ) : undefined
          }
          action={accounts.length > 0 ? 'Add account' : undefined}
          onAction={openNew}
        />
        {isLoading ? (
          <div className="space-y-2 p-4 sm:p-5">
            {[0, 1].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-white/[0.05]" />
            ))}
          </div>
        ) : isError ? (
          <PlainEmpty
            bare
            text="Your wholesaler accounts could not be loaded."
            action="Try again"
            onAction={() => refetch()}
          />
        ) : accounts.length === 0 ? (
          <PlainEmpty
            bare
            text="No wholesaler accounts yet. Add the ones you buy from, then import the price file each branch gives you."
            action="Add account"
            onAction={openNew}
          />
        ) : (
          <div className="divide-y divide-white/[0.07]">
            {accounts.map((a) => (
              <div key={a.id} className="flex min-h-[68px] items-center gap-3 px-4 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(a);
                    setShowAccount(true);
                  }}
                  className="min-w-0 flex-1 text-left touch-manipulation"
                >
                  <span className="block text-[15px] font-semibold leading-snug text-white line-clamp-2">
                    {a.display_name}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-white">
                    {a.account_number ? `Account ${a.account_number}` : 'No account number yet'}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] font-medium text-white">
                    {a.last_import
                      ? `${plural(a.price_count, 'price')}, last file ${ago(a.last_import.at)}`
                      : 'No price file yet'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => openImport(a.id)}
                  className="h-11 shrink-0 rounded-full border border-white/[0.16] px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                >
                  {a.price_count > 0 ? 'New file' : 'Import prices'}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={panelShellClass}>
        <PanelHead
          title="Price moves"
          meta={
            moves.length > 0 ? (
              <span className="truncate text-[13px] text-white">Last 60 days</span>
            ) : undefined
          }
          action={moves.length > shownMoves.length ? 'Show all' : undefined}
          onAction={() => setAllMoves(true)}
        />
        {movesLoading ? (
          <div className="space-y-2 p-4 sm:p-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-white/[0.05]" />
            ))}
          </div>
        ) : moves.length === 0 ? (
          <PlainEmpty
            bare
            text={
              accounts.some((a) => a.price_count > 0)
                ? 'No price has moved since your last price files.'
                : 'Price moves show here once you have imported two price files for an account.'
            }
          />
        ) : (
          <div className="divide-y divide-white/[0.07]">
            {shownMoves.map((m) => {
              const rise = m.change_pct > 0;
              return (
                <div key={m.id} className="flex min-h-[68px] items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-snug text-white line-clamp-2">
                      {m.item_name || m.description || m.product_code}
                    </p>
                    <p className="mt-0.5 text-[13px] text-white">
                      <span className="tabular-nums">
                        {gbp(m.old_price)} to {gbp(m.new_price)}
                      </span>
                      {' · '}
                      {m.connection}
                    </p>
                    <p className="mt-0.5 text-[12.5px] font-medium text-white">
                      {m.open_quotes > 0 ? (
                        <span className="text-elec-yellow">
                          On {plural(m.open_quotes, 'open quote')}
                        </span>
                      ) : (
                        'Not on an open quote'
                      )}
                      {' · '}
                      {ago(m.moved_at)}
                    </p>
                  </div>
                  <StatusPill tone={m.big ? (rise ? 'red' : 'green') : 'neutral'}>
                    {pct(m.change_pct)}
                  </StatusPill>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );

  const side = (
    <>
      {/* Gap #7: invoices forwarded here update last paid prices once posted */}
      <BillsAddressPanel />
      <section className={panelShellClass}>
        <PanelHead title="How prices get here" />
        <ol className="space-y-4 px-4 py-4 sm:px-5">
          {[
            [
              'Ask the branch for your price file',
              'Your account prices as a CSV or Excel file. Each wholesaler account says who to ask.',
            ],
            [
              'Import it here',
              'Rows are matched to your price book by product code, then by name. You tick any close matches.',
            ],
            [
              'Prices follow',
              'Linked items get the new buy price, and big moves are flagged on open quotes. Sent quotes are never changed.',
            ],
          ].map(([t, b], i) => (
            <li key={t} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.2] text-[12px] font-semibold text-white">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold text-white">{t}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-white">{b}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
          Elec-Mate has no live price link with any wholesaler yet, so this is a file you import.
          Purchase orders go to each account's order email with your account number and the product
          codes on them.
        </p>
      </section>

      {accounts.length > 0 && (
        <button
          type="button"
          onClick={() => openImport(null)}
          className="h-11 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]"
        >
          Import a price file
        </button>
      )}
    </>
  );

  return (
    <>
      <TwoColumn main={main} side={side} />
      <WholesalerAccountSheet
        open={showAccount}
        onOpenChange={setShowAccount}
        account={editing}
        taken={accounts.map((a) => a.wholesaler)}
        onSaved={(id) => {
          if (!editing) openImport(id);
        }}
      />
      <PriceFileImportSheet
        open={showImport}
        onOpenChange={setShowImport}
        accounts={accounts}
        accountId={importFor}
      />
    </>
  );
}

export default WholesalersPanel;
