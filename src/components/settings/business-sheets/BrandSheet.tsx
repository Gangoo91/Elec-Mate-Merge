import React, { useEffect, useRef, useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import SettingsSheetContent from '@/components/settings/SettingsSheetContent';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { certCoverStyle, type CertCoverStyle } from '@/utils/certBranding';
import {
  logoTonePreference,
  measureLogoTone,
  type LogoTonePreference,
  type LogoTone,
} from '@/utils/logoTone';
import CertCoverPreview from './CertCoverPreview';

interface BrandSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

// Colour inputs require 7-char #rrggbb — legacy rows hold short/invalid hex
// (e.g. '#000') which bricks the picker (ELE-1398). Expand or fall back.
const normaliseHex = (value: string | null | undefined, fallback: string): string => {
  const v = (value || '').trim();
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    return '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
  }
  return fallback;
};

const COVER_STYLES: { id: CertCoverStyle; label: string; hint: string }[] = [
  {
    id: 'house',
    label: 'Elec-Mate',
    hint: 'The standard navy cover. This is what your certificates look like today.',
  },
  {
    id: 'brand',
    label: 'My colour',
    hint: 'Your Primary colour fills the cover. Text and the scheme logo adapt so they stay readable on it.',
  },
  {
    id: 'print',
    label: 'Print-friendly',
    hint: 'A white cover with dark text — uses far less ink, and dark company logos show up properly.',
  },
];

/**
 * Cover colours that actually work as a certificate cover — deep enough to
 * carry white type and read as a document rather than a flyer. Offered
 * alongside a free picker, not instead of it.
 */
const LOGO_TONES: { id: LogoTonePreference; label: string }[] = [
  { id: 'auto', label: 'Automatic' },
  { id: 'dark', label: 'Dark logo' },
  { id: 'light', label: 'Light logo' },
];

const COVER_PRESETS = [
  { name: 'Navy', hex: '#0a1628' },
  { name: 'Royal blue', hex: '#1e40af' },
  { name: 'Slate', hex: '#334155' },
  { name: 'Charcoal', hex: '#1f2937' },
  { name: 'Forest', hex: '#14532d' },
  { name: 'Teal', hex: '#0f4c5c' },
  { name: 'Burgundy', hex: '#7f1d1d' },
  { name: 'Plum', hex: '#4c1d95' },
];

const BrandSheet = ({ open, onOpenChange, profile, onSave }: BrandSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#FFCC00');
  const [secondaryColor, setSecondaryColor] = useState('#1A1A1A');
  const [accentColor, setAccentColor] = useState('#F59E0B');
  const [coverStyle, setCoverStyle] = useState<CertCoverStyle>('house');
  const [coverColor, setCoverColor] = useState('#1e40af');
  const [logoTonePref, setLogoTonePref] = useState<LogoTonePreference>('auto');
  const [measuredTone, setMeasuredTone] = useState<LogoTone>('dark');

  // Hydrate ONCE per open transition (see CompanySheet for rationale).
  const hydratedForOpenRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedForOpenRef.current = false;
      return;
    }
    if (hydratedForOpenRef.current) return;
    if (!profile) return;
    setPrimaryColor(normaliseHex(profile.primary_color, '#FFCC00'));
    setSecondaryColor(normaliseHex(profile.secondary_color, '#1A1A1A'));
    setAccentColor(normaliseHex(profile.accent_color, '#F59E0B'));
    setCoverStyle(certCoverStyle((profile as { cert_cover_style?: string }).cert_cover_style));
    setCoverColor(
      normaliseHex(
        (profile as { cert_cover_color?: string }).cert_cover_color || profile.primary_color,
        '#1e40af'
      )
    );
    setLogoTonePref(logoTonePreference((profile as { cert_logo_tone?: string }).cert_logo_tone));
    hydratedForOpenRef.current = true;
  }, [profile, open]);

  const logoSrc = profile?.logo_url || profile?.logo_data_url || '';

  // Measure the logo so "Automatic" previews what will actually happen, rather
  // than telling the user "we'll work it out" and leaving them to find out on a
  // printed certificate.
  useEffect(() => {
    let cancelled = false;
    if (!open || !logoSrc) return;
    measureLogoTone(logoSrc).then((t) => {
      if (!cancelled) setMeasuredTone(t);
    });
    return () => {
      cancelled = true;
    };
  }, [open, logoSrc]);

  const effectiveTone: LogoTone = logoTonePref === 'auto' ? measuredTone : logoTonePref;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await onSave({
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        accent_color: accentColor,
        cert_cover_style: coverStyle,
        cert_cover_color: coverColor,
        cert_logo_tone: logoTonePref,
      });
      if (success) {
        toast.success('Brand colours saved');
        onOpenChange(false);
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  // ELE-1444 — three unlabelled swatches meant a user put his brand white into
  // Secondary and Accent and left Primary on an old colour, so his
  // certificates kept coming out in the wrong colour. Each row now says what
  // it actually affects. Verified against the real consumers: certBranding
  // reads primary_color then accent_color; secondary_color is quotes and
  // company pages only.
  const colours = [
    {
      label: 'Primary',
      hint: 'Your main brand colour — certificates, quotes and invoices',
      value: primaryColor,
      setter: setPrimaryColor,
    },
    {
      label: 'Secondary',
      hint: 'Supporting colour on quotes and your company pages',
      value: secondaryColor,
      setter: setSecondaryColor,
    },
    {
      label: 'Accent',
      hint: 'Used on certificates only if Primary is not set',
      value: accentColor,
      setter: setAccentColor,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SettingsSheetContent className="bg-[hsl(0_0%_12%)]">
        <div className="flex flex-col h-full bg-[hsl(0_0%_12%)]">
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 lg:pt-6 pb-4">
            <Eyebrow>Identity</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Brand colours
            </h2>
            <p className="mt-1 text-[13px] text-white">Colours used on your documents</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {colours.map(({ label, hint, value, setter }) => (
                <div key={label} className="space-y-2">
                  <Label className="text-white font-medium text-[13px]">{label}</Label>
                  <p className="text-[12px] leading-snug text-white">{hint}</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-11 h-11 rounded-xl border border-white/[0.08] cursor-pointer bg-transparent touch-manipulation"
                    />
                    <Input
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="flex-1 h-11 text-[13px] font-mono rounded-xl bg-[hsl(0_0%_12%)] border-white/[0.08] text-white uppercase focus:border-elec-yellow focus:ring-0 touch-manipulation"
                      maxLength={7}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* ELE-1671 — the cover block at the top of page 1 of every
                certificate. Defaults to the Elec-Mate navy so nobody's existing
                certificates change until they choose otherwise. */}
            <div className="space-y-3">
              <Eyebrow>Certificate cover</Eyebrow>
              <p className="text-[12px] leading-snug text-white">
                The colour block at the top of page 1
              </p>

              <div className="grid grid-cols-3 gap-2">
                {COVER_STYLES.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCoverStyle(id)}
                    aria-pressed={coverStyle === id}
                    className={cn(
                      'h-11 rounded-xl border text-[13px] transition-colors touch-manipulation',
                      coverStyle === id
                        ? 'bg-elec-yellow border-elec-yellow font-semibold text-black'
                        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <p className="text-[12px] leading-snug text-white">
                {COVER_STYLES.find((c) => c.id === coverStyle)?.hint}
              </p>

              {coverStyle === 'brand' && (
                <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <p className="text-[12px] leading-snug text-white">
                    Pick a colour for the cover. This is separate from your brand colours above — a
                    bright brand can make a hard-to-read certificate, so choose what suits the
                    document.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {COVER_PRESETS.map(({ name, hex: h }) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setCoverColor(h)}
                        aria-label={name}
                        aria-pressed={coverColor.toLowerCase() === h.toLowerCase()}
                        title={name}
                        className={cn(
                          'h-11 w-11 rounded-xl border-2 transition-colors touch-manipulation',
                          coverColor.toLowerCase() === h.toLowerCase()
                            ? 'border-elec-yellow'
                            : 'border-white/[0.12]'
                        )}
                        style={{ backgroundColor: h }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={coverColor}
                      onChange={(e) => setCoverColor(e.target.value)}
                      className="h-11 w-11 cursor-pointer rounded-xl border border-white/[0.08] bg-transparent touch-manipulation"
                    />
                    <Input
                      value={coverColor}
                      onChange={(e) => setCoverColor(e.target.value)}
                      maxLength={7}
                      className="h-11 flex-1 rounded-xl border-white/[0.08] bg-[hsl(0_0%_12%)] font-mono text-[13px] uppercase text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                    />
                  </div>
                </div>
              )}

              {/* ── Logo on the certificate ──────────────────────────
                  The masthead has to follow the LOGO. A white masthead saves a
                  dark logo and loses a pale one; a dark masthead does the
                  reverse. Both shipped in turn, so this is measured AND
                  overridable rather than assumed. */}
              <div className="space-y-2 pt-1">
                <Eyebrow>Your logo</Eyebrow>
                <p className="text-[12px] leading-snug text-white">
                  Tells us what to put behind your logo so it stays visible.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {LOGO_TONES.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setLogoTonePref(id)}
                      aria-pressed={logoTonePref === id}
                      className={cn(
                        'h-11 rounded-xl border text-[13px] transition-colors touch-manipulation',
                        logoTonePref === id
                          ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                          : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {logoTonePref === 'auto' && (
                  <p className="text-[12px] leading-snug text-white">
                    We read your logo as{' '}
                    <span className="font-semibold text-elec-yellow">
                      {effectiveTone === 'light' ? 'light artwork' : 'dark artwork'}
                    </span>
                    , so it sits on {effectiveTone === 'light' ? 'a dark' : 'a white'} band. Change
                    it above if that looks wrong.
                  </p>
                )}
              </div>

              {/* ── The viewer ───────────────────────────────────────── */}
              <div className="space-y-2 pt-1">
                <Eyebrow>Preview</Eyebrow>
                <CertCoverPreview
                  coverStyle={coverStyle}
                  coverColor={normaliseHex(coverColor, '#1e40af')}
                  logoTone={effectiveTone}
                  logoUrl={logoSrc}
                  schemeLogoUrl={
                    (
                      profile as {
                        scheme_logo_data_url?: string;
                        registration_scheme_logo?: string;
                      }
                    )?.scheme_logo_data_url ||
                    (profile as { registration_scheme_logo?: string })?.registration_scheme_logo ||
                    null
                  }
                  companyName={profile?.company_name}
                />
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SettingsSheetContent>
    </Sheet>
  );
};

export default BrandSheet;
