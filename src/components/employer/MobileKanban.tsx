import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChevronRight, MapPin, Users, ArrowRight, Plus, CheckSquare, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inputClass, PrimaryButton, SecondaryButton, DestructiveButton } from './editorial';

interface KanbanItem {
  id: string;
  title: string;
  subtitle?: string;
  value?: string;
  progress?: number;
  badges?: Array<{
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    color?: string;
  }>;
  stage: string;
  location?: string;
  workersCount?: number;
  checklistTotal?: number;
  checklistCompleted?: number;
  assignedWorkers?: Array<{ initials: string; name?: string }>;
}

interface Stage {
  id: string;
  label: string;
  color?: string;
}

interface MobileKanbanProps {
  items: KanbanItem[];
  stages: Stage[];
  onStageChange?: (itemId: string, newStage: string) => void;
  onItemClick?: (itemId: string) => void;
  onArchive?: (itemId: string) => void;
  onQuickAdd?: (title: string, stageId: string) => void;
  renderItem?: (item: KanbanItem) => React.ReactNode;
  /** Bump to open the quick add on the stage in view (the page's Add job button). */
  addSignal?: number;
}

// Stage accent colours for label strips
const getStageLabelColor = (stageId: string): string => {
  switch (stageId) {
    case 'Quoted':
      // was 'bg-[hsl(0_0%_12%)]-foreground' — an invalid class from a
      // scripted replace, so the Quoted indicator rendered invisible
      return 'bg-amber-400';
    case 'Confirmed':
      return 'bg-info';
    case 'Scheduled':
      return 'bg-warning';
    case 'In Progress':
      return 'bg-elec-yellow';
    case 'Testing':
      return 'bg-purple-500';
    case 'Complete':
      return 'bg-success';
    default:
      return 'bg-white/40';
  }
};

const getStageButtonColor = (stageId: string): string => {
  switch (stageId) {
    case 'Quoted':
      return 'bg-white/[0.06] hover:bg-white/[0.1] text-white';
    case 'Confirmed':
      return 'bg-info/20 hover:bg-info/30 text-info';
    case 'Scheduled':
      return 'bg-warning/20 hover:bg-warning/30 text-warning';
    case 'In Progress':
      return 'bg-white/[0.06] hover:bg-white/[0.06] text-elec-yellow';
    case 'Testing':
      return 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-500';
    case 'Complete':
      return 'bg-success/20 hover:bg-success/30 text-success';
    default:
      return 'bg-white/[0.06] hover:bg-white/[0.1] text-white';
  }
};

export function MobileKanban({
  items,
  stages,
  onStageChange,
  onItemClick,
  onArchive,
  onQuickAdd,
  renderItem,
  addSignal,
}: MobileKanbanProps) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [moveSheetOpen, setMoveSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KanbanItem | null>(null);
  const [quickAddStage, setQuickAddStage] = useState<string | null>(null);
  const [quickAddTitle, setQuickAddTitle] = useState('');

  // Touch tracking for preventing accidental clicks while scrolling
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressTriggered = useRef(false);

  // Horizontal scroll container ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getItemsForStage = (stageId: string) => items.filter((item) => item.stage === stageId);

  // Calculate stage counts for pills
  const stageCounts = stages.reduce(
    (acc, stage) => {
      acc[stage.id] = getItemsForStage(stage.id).length;
      return acc;
    },
    {} as Record<string, number>
  );

  // Handle stage pill click - scroll to that stage
  const handleStagePillClick = (stageId: string) => {
    if (!stageId) {
      // "All" was clicked - scroll to first stage
      setActiveStageIndex(0);
      scrollToStage(0);
      return;
    }
    const index = stages.findIndex((s) => s.id === stageId);
    if (index >= 0) {
      setActiveStageIndex(index);
      scrollToStage(index);
    }
  };

  const scrollToStage = (index: number) => {
    if (scrollContainerRef.current) {
      const columnWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * columnWidth,
        behavior: 'smooth',
      });
    }
  };

  // Open on the first column that has work in it. Starting on an empty
  // "Enquiry" column when every job is further along looked like no jobs.
  const openedOnWork = useRef(false);
  useEffect(() => {
    if (openedOnWork.current || items.length === 0) return;
    openedOnWork.current = true;
    const first = stages.findIndex((s) => items.some((item) => item.stage === s.id));
    if (first > 0) {
      setActiveStageIndex(first);
      // After the columns have laid out; an immediate scroll landed short.
      window.setTimeout(() => scrollToStage(first), 350);
    }
  }, [items, stages]);

  // The page's Add job button opens the quick add on the stage in view.
  useEffect(() => {
    if (!addSignal) return;
    const id = stages[activeStageIndex]?.id;
    if (id) setQuickAddStage(id);
    // Only when the signal changes, not when the user swipes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSignal]);

  // Update active stage based on scroll position
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const columnWidth = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / columnWidth);
      if (newIndex !== activeStageIndex && newIndex >= 0 && newIndex < stages.length) {
        setActiveStageIndex(newIndex);
      }
    }
  };

  // Touch handlers with distance check to prevent accidental clicks
  const handleTouchStart = (item: KanbanItem, e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    longPressTriggered.current = false;

    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      setSelectedItem(item);
      setMoveSheetOpen(true);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  };

  // A touch is handled by the touch handlers; the click that follows it is
  // ignored. A mouse or keyboard (a narrow desktop window, a tablet with a
  // trackpad) only fires click, so that opens the job.
  const lastTouchAt = useRef(0);
  const handleCardClick = (item: KanbanItem) => {
    if (Date.now() - lastTouchAt.current < 800) return;
    onItemClick?.(item.id);
  };

  const handleTouchEnd = (item: KanbanItem, e: React.TouchEvent) => {
    lastTouchAt.current = Date.now();
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    // Calculate distance moved
    if (touchStartPos.current) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const distance = Math.sqrt(
        Math.pow(endX - touchStartPos.current.x, 2) + Math.pow(endY - touchStartPos.current.y, 2)
      );

      // Only trigger click if it was a tap (< 10px movement) and not a long press
      if (distance < 10 && !longPressTriggered.current) {
        onItemClick?.(item.id);
      }
    }

    touchStartPos.current = null;
  };

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleMoveToStage = (stageId: string) => {
    if (selectedItem && onStageChange) {
      onStageChange(selectedItem.id, stageId);
    }
    setMoveSheetOpen(false);
    setSelectedItem(null);
  };

  const handleQuickAddSubmit = (stageId: string) => {
    if (quickAddTitle.trim() && onQuickAdd) {
      onQuickAdd(quickAddTitle.trim(), stageId);
      setQuickAddTitle('');
      setQuickAddStage(null);
    }
  };

  return (
    <>
      {/* Stage picker: every stage visible at once, never a sideways scroll. */}
      <div className="mb-4 grid grid-cols-4 gap-1.5">
        {stages.map((stage) => {
          const on = stages[activeStageIndex]?.id === stage.id;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => handleStagePillClick(stage.id)}
              aria-pressed={on}
              className={cn(
                'flex h-12 min-w-0 flex-col items-center justify-center rounded-xl border px-1 text-center touch-manipulation transition-colors',
                on
                  ? 'border-elec-yellow bg-elec-yellow text-black'
                  : 'border-white/[0.12] bg-white/[0.04] text-white'
              )}
            >
              <span className="w-full truncate text-[11.5px] font-semibold leading-tight">
                {stage.label}
              </span>
              <span className="text-[12px] font-semibold tabular-nums leading-tight">
                {stageCounts[stage.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Horizontal Scrolling Kanban */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {stages.map((stage, stageIndex) => {
          const stageItems = getItemsForStage(stage.id);

          return (
            <div
              key={stage.id}
              className="w-full flex-shrink-0 snap-center px-4"
              style={{ minWidth: '100%' }}
            >
              {/* Stage Header */}
              <div className="mb-3 flex items-baseline gap-2">
                <span
                  aria-hidden
                  className={cn(
                    'h-2 w-2 shrink-0 self-center rounded-full',
                    stage.color || getStageLabelColor(stage.id)
                  )}
                />
                <h3 className="text-[16px] font-semibold tracking-tight text-white">
                  {stage.label}
                </h3>
                <span className="text-[13px] text-white">
                  {stageItems.length} {stageItems.length === 1 ? 'job' : 'jobs'}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-[160px]">
                {stageItems.length === 0 ? (
                  <p className="py-3 text-[14px] text-white">Nothing at this stage.</p>
                ) : (
                  stageItems.map((item) => (
                    <Card
                      key={item.id}
                      onTouchStart={(e) => handleTouchStart(item, e)}
                      onTouchEnd={(e) => handleTouchEnd(item, e)}
                      onTouchMove={handleTouchMove}
                      onClick={() => handleCardClick(item)}
                      className={cn(
                        'rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04] shadow-none cursor-pointer touch-manipulation',
                        'active:scale-[0.98] transition-transform select-none'
                      )}
                    >
                      <CardContent className="p-4 space-y-1.5">
                        {renderItem ? (
                          renderItem(item)
                        ) : (
                          <>
                            {/* Label Strips */}
                            {item.badges && item.badges.length > 0 && (
                              <div className="flex gap-1">
                                {item.badges.slice(0, 3).map((badge, idx) => (
                                  <div
                                    key={idx}
                                    className={cn(
                                      'h-2 w-10 rounded-full',
                                      badge.color || 'bg-elec-yellow'
                                    )}
                                    title={badge.label}
                                  />
                                ))}
                              </div>
                            )}

                            {/* Title & Value Row */}
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-[15px] font-semibold leading-snug text-white line-clamp-2">
                                {item.title}
                              </h4>
                              <ChevronRight className="h-4 w-4 text-white shrink-0 mt-0.5" />
                            </div>

                            {/* Client */}
                            {item.subtitle && (
                              <p className="text-[13px] text-white truncate">{item.subtitle}</p>
                            )}

                            {/* Bottom Row: Checklist + Workers */}
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center gap-3">
                                {/* Checklist progress */}
                                {item.checklistTotal !== undefined && item.checklistTotal > 0 && (
                                  <div className="flex items-center gap-1 text-[13px] text-white">
                                    <CheckSquare className="h-3.5 w-3.5" />
                                    <span>
                                      {item.checklistCompleted || 0}/{item.checklistTotal}
                                    </span>
                                  </div>
                                )}

                                {/* Value */}
                                {item.value && (
                                  <span className="text-[13px] font-semibold text-white tabular-nums">
                                    {item.value}
                                  </span>
                                )}
                              </div>

                              {/* Assigned worker avatars */}
                              {item.assignedWorkers && item.assignedWorkers.length > 0 && (
                                <div className="flex -space-x-2">
                                  {item.assignedWorkers.slice(0, 3).map((worker, idx) => (
                                    <div
                                      key={idx}
                                      className="w-6 h-6 rounded-full bg-white/[0.06] border-2 border-[hsl(0_0%_12%)] flex items-center justify-center"
                                      title={worker.name}
                                    >
                                      <span className="text-[10px] font-semibold text-white">
                                        {worker.initials}
                                      </span>
                                    </div>
                                  ))}
                                  {item.assignedWorkers.length > 3 && (
                                    <div className="w-6 h-6 rounded-full bg-white/[0.06] border-2 border-[hsl(0_0%_12%)] flex items-center justify-center">
                                      <span className="text-[10px] font-medium text-white">
                                        +{item.assignedWorkers.length - 3}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}

                {/* Quick Add Card */}
                {quickAddStage === stage.id ? (
                  <Card className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.14]">
                    <CardContent className="p-3">
                      <Input
                        value={quickAddTitle}
                        onChange={(e) => setQuickAddTitle(e.target.value)}
                        placeholder="Enter job title..."
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleQuickAddSubmit(stage.id);
                          if (e.key === 'Escape') {
                            setQuickAddTitle('');
                            setQuickAddStage(null);
                          }
                        }}
                        onBlur={() => {
                          if (!quickAddTitle.trim()) {
                            setQuickAddStage(null);
                          }
                        }}
                        className={inputClass}
                      />
                      <div className="flex gap-2 mt-2">
                        <PrimaryButton
                          size="sm"
                          onClick={() => handleQuickAddSubmit(stage.id)}
                          disabled={!quickAddTitle.trim()}
                        >
                          Add
                        </PrimaryButton>
                        <SecondaryButton
                          size="sm"
                          onClick={() => {
                            setQuickAddTitle('');
                            setQuickAddStage(null);
                          }}
                        >
                          Cancel
                        </SecondaryButton>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  onQuickAdd && (
                    <button
                      type="button"
                      data-help="jobboard.add"
                      className="w-full h-11 flex items-center justify-start gap-2 px-3 rounded-full text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
                      onClick={() => setQuickAddStage(stage.id)}
                    >
                      <Plus className="h-4 w-4" />
                      Add job
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe indicator dots */}
      <div className="flex justify-center gap-1.5 mt-4 min-h-[44px] items-center">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            onClick={() => {
              setActiveStageIndex(index);
              scrollToStage(index);
            }}
            className={cn(
              'w-3 h-3 rounded-full transition-all touch-manipulation p-2 -m-2',
              index === activeStageIndex ? 'bg-elec-yellow w-5' : 'bg-white/[0.15]'
            )}
            aria-label={`Go to ${stage.label}`}
          />
        ))}
      </div>

      {/* Move to Stage Sheet */}
      <Sheet open={moveSheetOpen} onOpenChange={setMoveSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl bg-[hsl(0_0%_8%)] border-t border-white/[0.06]"
        >
          <SheetHeader className="pb-4">
            <SheetTitle className="text-left text-white">Move "{selectedItem?.title}"</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-2 pb-4">
            {stages.map((stage) => (
              <button
                key={stage.id}
                type="button"
                className={cn(
                  'h-12 flex items-center justify-start gap-3 rounded-full px-4 border border-white/[0.1] text-[13px] font-medium touch-manipulation transition-all active:scale-[0.98]',
                  selectedItem?.stage === stage.id && 'border-elec-yellow bg-white/[0.06]',
                  stage.color
                    ? 'bg-white/[0.06] hover:bg-white/[0.1] text-white'
                    : getStageButtonColor(stage.id)
                )}
                onClick={() => handleMoveToStage(stage.id)}
                disabled={selectedItem?.stage === stage.id}
              >
                {stage.color ? (
                  <span className={cn('h-2.5 w-2.5 rounded-full shrink-0', stage.color)} />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                <span className="font-medium">{stage.label}</span>
              </button>
            ))}
          </div>

          {/* Archive option */}
          {onArchive && selectedItem && (
            <div className="border-t border-white/[0.06] pt-4">
              <DestructiveButton
                fullWidth
                onClick={() => {
                  onArchive(selectedItem.id);
                  setMoveSheetOpen(false);
                  setSelectedItem(null);
                }}
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive Job
              </DestructiveButton>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
