import { Activity, Check, GitBranch, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TestOption {
  value: string;
  label: string;
  /** The same test, said the way you would say it to a first-year. */
  plain: string;
  reg: string;
  state: 'dead' | 'live';
  /** What the test is actually for. */
  proves: string;
  icon: LucideIcon;
}

/**
 * 🔴 Dead or live is the first thing on the card.
 *
 * These four used to sit inside a 280px `<Select>` — you could not see that
 * there were four without opening it, and nothing on it said which tests are
 * done with the supply off. Three of these are dead tests and one is carried
 * out live; getting that wrong is the kind of mistake this page exists to
 * prevent, so it is a label on the card rather than a sentence in the intro.
 *
 * `plain` is the same test in the words an apprentice would use. The formal
 * name stays — they have to know "continuity of protective conductors" for the
 * exam and the certificate — but it is not what tells you what you are doing.
 *
 * No acceptance values here on purpose. The numbers live in each guide, which
 * is written and reviewed; repeating a threshold on a card is how the two end
 * up disagreeing, and a wrong limit on a test page is worse than no limit.
 */
export const TEST_OPTIONS: TestOption[] = [
  {
    value: 'r1r2',
    label: 'R₁+R₂ continuity',
    plain: 'Is the earth connected all the way round?',
    reg: '643.2',
    state: 'dead',
    proves:
      'Proves the protective conductor is continuous and low enough in resistance to carry a fault back to the board.',
    icon: Zap,
  },
  {
    value: 'ir',
    label: 'Insulation resistance',
    plain: 'Is the insulation still doing its job?',
    reg: '643.3',
    state: 'dead',
    proves:
      'Proves the insulation between conductors, and between conductors and earth, has not broken down.',
    icon: Activity,
  },
  {
    value: 'polarity',
    label: 'Polarity',
    plain: 'Is everything wired the right way round?',
    reg: '643.6',
    state: 'dead',
    proves:
      'Proves line and neutral are not swapped and that switches and protective devices sit in the line conductor.',
    icon: Check,
  },
  {
    value: 'zs',
    label: 'Earth fault loop (Zs)',
    plain: 'Will the breaker trip fast enough?',
    reg: '643.7',
    state: 'live',
    proves:
      'Proves the fault loop is low enough for the protective device to disconnect within the required time.',
    icon: GitBranch,
  },
];
