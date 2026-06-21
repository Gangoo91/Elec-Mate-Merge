import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  PoundSterling,
  Receipt,
  HardHat,
  ClipboardCheck,
  Shield,
  Zap,
  GitBranch,
  Link2,
  CheckCircle2,
  Trash2,
  ChevronLeft,
  LayoutGrid,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/**
 * Link types the detail page knows how to open via LinkEntitySheet.
 * Kept in sync with the `LinkType` union in ProjectDetailPage.
 */
export type ProjectLinkType =
  | 'quote'
  | 'invoice'
  | 'certificate'
  | 'rams'
  | 'siteVisit'
  | 'circuitDesign'
  | 'costEstimate'
  | 'floorPlan';

export interface ProjectActionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  /** Project identity — works for both snake_case (detail) and camelCase (card) sources. */
  projectId: string;
  projectTitle: string;
  customerName?: string | null;
  location?: string | null;
  /** Project status — used to hide "Mark complete" when already completed. */
  status?: string | null;

  /**
   * 'detail' — local sheets exist on the host page, pass real handlers.
   * 'card'   — no local sheets; sheet-based actions hand off to the detail
   *            page via `?action=` query params.
   */
  mode: 'detail' | 'card';

  /** Detail-mode handlers. Optional — when absent we fall back to `?action=` navigation. */
  onAddExpense?: () => void;
  onAddTask?: () => void;
  onLink?: (type: ProjectLinkType) => void;
  onComplete?: () => void;
  onDelete?: () => void;
}

const LINK_OPTIONS: { type: ProjectLinkType; label: string; icon: typeof FileText }[] = [
  { type: 'quote', label: 'Quote', icon: FileText },
  { type: 'invoice', label: 'Invoice', icon: PoundSterling },
  { type: 'certificate', label: 'Certificate', icon: Shield },
  { type: 'rams', label: 'RAMS', icon: Zap },
  { type: 'siteVisit', label: 'Site visit', icon: HardHat },
  { type: 'circuitDesign', label: 'Circuit design', icon: Zap },
  { type: 'costEstimate', label: 'Cost estimate', icon: PoundSterling },
  { type: 'floorPlan', label: 'Floor plan', icon: LayoutGrid },
];

const tileClass =
  'flex flex-col items-start gap-2.5 p-3.5 min-h-[88px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none';
const tileIconClass =
  'h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0';

const ProjectActionsSheet = ({
  open,
  onOpenChange,
  projectId,
  projectTitle,
  customerName,
  location,
  status,
  mode,
  onAddExpense,
  onAddTask,
  onLink,
  onComplete,
  onDelete,
}: ProjectActionsSheetProps) => {
  const navigate = useNavigate();
  const [linkPicker, setLinkPicker] = useState(false);

  const isCompleted = status === 'completed';
  const enc = (s?: string | null) => encodeURIComponent(s || '');

  // Create-route URLs (mirror ProjectDetailPage.linkConfig + siteVisitNewUrl).
  const quoteUrl = `/electrician/quote-builder/create?projectId=${projectId}`;
  const variationUrl = `${quoteUrl}&variation=1`;
  const invoiceUrl = `/electrician/invoice-builder/create?projectId=${projectId}`;
  const certificateUrl = `/electrician/certificates/new?projectId=${projectId}&clientName=${enc(customerName)}&address=${enc(location)}`;
  const ramsUrl = `/electrician-tools/site-safety?projectId=${projectId}&location=${enc(location)}&clientName=${enc(customerName)}`;
  const siteVisitUrl = (() => {
    const params = new URLSearchParams();
    params.set('projectId', projectId);
    if (customerName) params.set('clientName', customerName);
    if (location) params.set('address', location);
    return `/electrician/site-visit/new?${params.toString()}`;
  })();

  const close = () => {
    setLinkPicker(false);
    onOpenChange(false);
  };

  const go = (url: string) => {
    close();
    navigate(url);
  };

  // Sheet-based actions: use a real handler when given (detail mode), else
  // hand off to the detail page which reads `?action=` on mount (card mode).
  const handleExpense = () => {
    close();
    if (onAddExpense) {
      onAddExpense();
    } else {
      navigate(`/electrician/projects/${projectId}?action=expense`);
    }
  };

  const handleTask = () => {
    close();
    if (onAddTask) {
      onAddTask();
    } else {
      navigate(`/electrician/projects/${projectId}?action=task`);
    }
  };

  const handleLink = (type: ProjectLinkType) => {
    close();
    if (onLink) {
      onLink(type);
    } else {
      // Card mode has no LinkEntitySheet — send the user to the detail page,
      // where they can link from the relevant section.
      navigate(`/electrician/projects/${projectId}`);
    }
  };

  const handleComplete = () => {
    close();
    onComplete?.();
  };

  const handleDelete = () => {
    close();
    onDelete?.();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) setLinkPicker(false);
        onOpenChange(o);
      }}
    >
      <SheetContent
        side="bottom"
        className="rounded-t-2xl p-0 max-h-[88vh] overflow-y-auto overscroll-contain border-t border-white/[0.10] lg:left-64"
      >
        <div className="w-full px-4 sm:px-6 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
          {/* Grab handle */}
          <div className="mx-auto h-1 w-10 rounded-full bg-white/[0.15] mb-4" />

          {/* Context header */}
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-white/[0.08]">
            {linkPicker && (
              <button
                type="button"
                onClick={() => setLinkPicker(false)}
                aria-label="Back"
                className="w-9 h-9 -ml-1 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/[0.06] touch-manipulation flex-shrink-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <SheetTitle className="text-[15px] font-semibold text-white truncate text-left">
                {linkPicker ? 'Link existing' : projectTitle}
              </SheetTitle>
              {!linkPicker && (customerName || location) && (
                <p className="text-[11.5px] text-white/55 truncate">
                  {[customerName, location].filter(Boolean).join(' · ')}
                </p>
              )}
              {linkPicker && (
                <p className="text-[11.5px] text-white/55 truncate">
                  Attach an existing record to this project
                </p>
              )}
            </div>
          </div>

          {linkPicker ? (
            /* ── Link existing — type chooser ── */
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {LINK_OPTIONS.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleLink(type)}
                  className="flex flex-col items-start gap-2.5 p-3.5 min-h-[80px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
                >
                  <span className={tileIconClass}>
                    <Icon className="h-4 w-4 text-white/85" />
                  </span>
                  <span className="block text-[13px] font-semibold text-white">{label}</span>
                </button>
              ))}
            </div>
          ) : (
            <>
              {/* ── Create ── */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 mb-2">
                Create
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button type="button" onClick={() => go(quoteUrl)} className={tileClass}>
                  <span className={tileIconClass}>
                    <FileText className="h-4 w-4 text-emerald-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Quote</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Price the job</span>
                  </span>
                </button>

                <button type="button" onClick={() => go(invoiceUrl)} className={tileClass}>
                  <span className={tileIconClass}>
                    <PoundSterling className="h-4 w-4 text-blue-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Invoice</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Bill the work</span>
                  </span>
                </button>

                <button type="button" onClick={handleExpense} className={tileClass}>
                  <span className={tileIconClass}>
                    <Receipt className="h-4 w-4 text-rose-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Expense</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Log a cost</span>
                  </span>
                </button>

                <button type="button" onClick={() => go(siteVisitUrl)} className={tileClass}>
                  <span className={tileIconClass}>
                    <HardHat className="h-4 w-4 text-sky-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Site visit</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Record on site</span>
                  </span>
                </button>

                <button type="button" onClick={handleTask} className={tileClass}>
                  <span className={tileIconClass}>
                    <ClipboardCheck className="h-4 w-4 text-amber-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Task</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Plan the work</span>
                  </span>
                </button>

                <button type="button" onClick={() => go(ramsUrl)} className={tileClass}>
                  <span className={tileIconClass}>
                    <Zap className="h-4 w-4 text-purple-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">RAMS</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Risk & method</span>
                  </span>
                </button>

                <button type="button" onClick={() => go(certificateUrl)} className={tileClass}>
                  <span className={tileIconClass}>
                    <Shield className="h-4 w-4 text-amber-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Certificate</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">EICR, EIC, MW</span>
                  </span>
                </button>

                <button type="button" onClick={() => go(variationUrl)} className={tileClass}>
                  <span className={tileIconClass}>
                    <GitBranch className="h-4 w-4 text-elec-yellow" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Change of scope</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Raise a variation</span>
                  </span>
                </button>
              </div>

              {/* ── Manage ── */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 mt-4 mb-2">
                Manage
              </p>
              <div
                className={cn(
                  'grid gap-2',
                  isCompleted ? 'grid-cols-1' : 'grid-cols-2'
                )}
              >
                <button
                  type="button"
                  onClick={() => setLinkPicker(true)}
                  className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
                >
                  <Link2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <span className="text-[13px] font-semibold text-white">Link existing</span>
                </button>

                {!isCompleted && onComplete && (
                  <button
                    type="button"
                    onClick={handleComplete}
                    className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/[0.15] hover:bg-emerald-500/[0.1] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-[13px] font-semibold text-white">Mark complete</span>
                  </button>
                )}
              </div>

              {/* Destructive — separated */}
              {onDelete && (
                <div className="border-t border-white/[0.08] mt-3 pt-3">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full flex items-center gap-3 h-12 px-3 rounded-xl hover:bg-red-500/[0.06] active:bg-red-500/[0.1] touch-manipulation transition-all"
                  >
                    <Trash2 className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-[13px] font-semibold text-red-400">Delete project</span>
                    <span className="text-[11px] text-white/45 ml-auto">
                      Permanent — cannot be undone
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectActionsSheet;
