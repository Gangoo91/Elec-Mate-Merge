import { motion } from 'framer-motion';
import { type LucideIcon, CheckCircle } from 'lucide-react';

interface ShowcaseItem {
  icon: LucideIcon;
  label: string;
}

interface GridItem {
  icon: LucideIcon;
  label: string;
}

interface TierCard {
  name: string;
  colour: string;
  description: string;
  price: string;
  badge?: string;
  badgeColour?: string;
}

type SlideVariant = 'hero' | 'showcase' | 'stats' | 'feature-grid' | 'tiers' | 'cta';

interface WalkthroughSlideProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  accentColour: string;
  variant?: SlideVariant;
  showcaseItems?: ShowcaseItem[];
  statCallout?: string;
  gridItems?: GridItem[];
  tierCards?: TierCard[];
}

const WalkthroughSlide = ({
  icon: Icon,
  title,
  description,
  features,
  accentColour,
  variant = 'hero',
  showcaseItems,
  statCallout,
  gridItems,
  tierCards,
}: WalkthroughSlideProps) => {
  const iconBg = accentColour + '26'; // 15% opacity hex suffix

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center text-center px-6 w-full"
    >
      {/* ── Hero variant ── */}
      {variant === 'hero' && (
        <>
          <div className="relative mb-8">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-30"
              style={{ backgroundColor: accentColour }}
            />
            <div
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center border border-white/10"
              style={{ backgroundColor: iconBg }}
            >
              <Icon className="h-12 w-12" style={{ color: accentColour }} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 leading-tight">{title}</h2>
          <p className="text-white text-base max-w-sm leading-relaxed">{description}</p>
        </>
      )}

      {/* ── Showcase variant (icon grid) ── */}
      {variant === 'showcase' && (
        <>
          <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{title}</h2>
          <p className="text-white text-sm mb-6 max-w-xs leading-relaxed">{description}</p>
          {showcaseItems && (
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-2">
              {showcaseItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 rounded-xl border border-white/10 py-3 px-2"
                    style={{ backgroundColor: iconBg }}
                  >
                    <ItemIcon className="h-6 w-6" style={{ color: accentColour }} />
                    <span className="text-white text-xs font-medium leading-tight text-center">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── Stats variant ── */}
      {variant === 'stats' && (
        <>
          <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{title}</h2>
          {statCallout && (
            <div className="mb-4">
              <span className="text-5xl font-extrabold" style={{ color: accentColour }}>
                {statCallout}
              </span>
              <p className="text-white text-sm mt-1">practice questions</p>
            </div>
          )}
          <div className="space-y-2.5 w-full max-w-xs">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-left">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: accentColour }}
                />
                <span className="text-sm text-white">{feature}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Feature Grid variant ── */}
      {variant === 'feature-grid' && (
        <>
          <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{title}</h2>
          <p className="text-white text-sm mb-5 max-w-xs leading-relaxed">{description}</p>
          {gridItems && (
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
              {gridItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 p-3"
                    style={{ backgroundColor: iconBg }}
                  >
                    <ItemIcon className="h-5 w-5 flex-shrink-0" style={{ color: accentColour }} />
                    <span className="text-white text-xs font-medium leading-tight text-left">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── Tiers variant ── */}
      {variant === 'tiers' && (
        <>
          <h2 className="text-2xl font-bold text-white mb-5 leading-tight">{title}</h2>
          {tierCards && (
            <div className="space-y-3 w-full max-w-sm">
              {tierCards.map((tier) => (
                <div
                  key={tier.name}
                  className="flex items-center gap-3 rounded-xl border p-4"
                  style={{
                    borderColor: tier.colour + '40',
                    backgroundColor: tier.colour + '12',
                  }}
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-base" style={{ color: tier.colour }}>
                        {tier.name}
                      </span>
                      {tier.badge && (
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: (tier.badgeColour || tier.colour) + '30',
                            color: tier.badgeColour || tier.colour,
                          }}
                        >
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-white text-xs leading-snug">{tier.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-white text-xs font-medium">{tier.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── CTA variant ── */}
      {variant === 'cta' && (
        <>
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-white/10"
            style={{ backgroundColor: iconBg }}
          >
            <Icon className="h-10 w-10" style={{ color: accentColour }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 leading-tight">{title}</h2>
          <div className="space-y-3 w-full max-w-xs">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: accentColour }} />
                <span className="text-sm text-white">{feature}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default WalkthroughSlide;
