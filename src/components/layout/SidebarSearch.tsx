/**
 * SidebarSearch — type in the sidebar, results replace the menu (ELE-1804).
 *
 * Andrew, 4 Oct 2026: "I thought it would just enable us to search in the box
 * we put in, not bring this up." So the box IS the search. While there is a
 * query, the menu list is swapped for matching pages; clear it and the menu is
 * back. The header 🔍 and ⌘K no longer open a pop-up — they fire
 * OPEN_SEARCH_EVENT and land the cursor here.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

import { searchPages, OPEN_SEARCH_EVENT, MIN_QUERY_LENGTH } from '@/lib/searchPages';
import { cn } from '@/lib/utils';

interface SidebarSearchProps {
  /** Called after a result is opened — the mobile drawer closes itself. */
  onPick: () => void;
  /** Called when the header asks for search, before focusing (opens the drawer). */
  onRequestOpen: () => void;
  /** The menu, shown whenever the box is empty. */
  children: React.ReactNode;
  /** Phone drawer state — closing the drawer clears a half-typed search. */
  open?: boolean;
}

const SUGGESTIONS = ['quote', 'EICR', 'log hours', 'calendar'];
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export function SidebarSearch({ onPick, onRequestOpen, children, open: drawerOpen }: SidebarSearchProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchPages(query), [query]);
  const searching = query.trim().length > 0;
  const tooShort = searching && query.trim().length < MIN_QUERY_LENGTH;

  // Reopening the phone menu should show the menu, not last time's results.
  useEffect(() => {
    if (drawerOpen === false) setQuery('');
  }, [drawerOpen]);

  // Header 🔍 / ⌘K: open the drawer (phones) and put the cursor in the box.
  // The short delay lets the drawer's slide-in finish so focus is not lost.
  useEffect(() => {
    const onOpen = () => {
      onRequestOpen();
      window.setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 120);
    };
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
  }, [onRequestOpen]);

  // A new query always starts at the top result.
  useEffect(() => setActive(0), [query]);

  // Keep the keyboard-highlighted row in view.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const open = (path: string) => {
    setQuery('');
    inputRef.current?.blur();
    navigate(path);
    onPick();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (query) setQuery('');
      else inputRef.current?.blur();
      return;
    }
    if (!searching || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      open(results[active].path);
    }
  };

  return (
    <>
      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-elec-yellow"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          enterKeyHint="go"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search the app"
          aria-label="Search pages"
          role="combobox"
          aria-expanded={searching && results.length > 0}
          aria-controls="sidebar-search-results"
          aria-activedescendant={
            searching && results.length > 0 ? `sidebar-search-option-${active}` : undefined
          }
          className={cn(
            // text-base (16px) so iOS does not zoom the page on focus.
            'h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] pl-9 pr-11 text-base text-white',
            'placeholder:text-white/60 caret-elec-yellow touch-manipulation transition-colors',
            'hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0',
            '[&::-webkit-search-cancel-button]:hidden'
          )}
        />
        {/* Desktop hint for the shortcut; phones have no keyboard to press it on. */}
        {!query && (
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/[0.14] bg-white/[0.06] px-1.5 py-0.5 font-sans text-[11px] font-medium text-white lg:block">
            {isMac ? '⌘K' : 'Ctrl K'}
          </kbd>
        )}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-white touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {!searching ? (
        children
      ) : tooShort ? (
        <p className="px-2 py-4 text-[13px] text-white">Keep typing…</p>
      ) : results.length === 0 ? (
        <div className="px-2 py-5">
          <p className="text-[14px] font-semibold text-white">Nothing matches “{query.trim()}”</p>
          <p className="mt-1 text-[13px] leading-snug text-white">
            Try a page name or a job:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(s);
                  inputRef.current?.focus();
                }}
                className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13.5px] font-medium text-white touch-manipulation active:bg-white/[0.12]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-1 px-4 text-[12px] font-medium text-white">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>
          {/* Same row as a menu item (SidebarNavLink): text only, and the
              highlighted result marked the way the current page is — a volt
              edge bar and a volt name. */}
          <ul id="sidebar-search-results" ref={listRef} role="listbox" className="space-y-0.5">
            {results.map((page, i) => {
              const on = i === active;
              // "Inspection & Testing · Inspection & Testing" says nothing twice.
              const showSection = !page.name.toLowerCase().includes(page.category.toLowerCase());
              return (
                <li
                  key={page.path}
                  id={`sidebar-search-option-${i}`}
                  role="option"
                  aria-selected={on}
                  data-index={i}
                >
                  <button
                    type="button"
                    onClick={() => open(page.path)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'relative flex min-h-[48px] w-full flex-col justify-center overflow-hidden rounded-2xl border py-2.5 pl-4 pr-3 text-left touch-manipulation',
                      'transition-[background-color,border-color] duration-200 ease-out active:scale-[0.98]',
                      on
                        ? 'border-elec-yellow/35 bg-white/[0.09]'
                        : 'border-transparent hover:border-white/[0.10] hover:bg-white/[0.06]'
                    )}
                  >
                    {on && (
                      <span
                        aria-hidden
                        className="absolute inset-y-1.5 left-0 w-[3px] rounded-r-full bg-elec-yellow"
                      />
                    )}
                    {/* Two lines, not an ellipsis — the sidebar is narrow. */}
                    <span
                      className={cn(
                        'line-clamp-2 text-[15px] leading-snug transition-colors duration-200',
                        on ? 'font-semibold tracking-tight text-elec-yellow' : 'font-medium text-white'
                      )}
                    >
                      {page.name}
                    </span>
                    {showSection && (
                      <span className="mt-0.5 truncate text-[12px] text-white">{page.category}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default SidebarSearch;
