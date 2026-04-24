export type NavItem = {
  name: string;
  path: string;
  roles: string[];
  adminOnly?: boolean;
  allowedEmails?: string[];
  dividerAfter?: boolean;
  badge?: string;
  badgeVariant?: 'early' | 'new';
};

export const mainNavItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
  },
  {
    name: 'Apprentice Hub',
    path: '/apprentice',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
  },
  {
    name: 'Electrical Hub',
    path: '/electrician',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
  },
  {
    name: 'Elec-AI',
    path: '/electrician-tools/ai-tooling/assistant',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
    badge: 'New',
    badgeVariant: 'new',
  },
  {
    name: 'Mate',
    path: '/electrician/business-ai',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
    badge: 'Early access',
    badgeVariant: 'early',
  },
  {
    name: 'Employer Hub',
    path: '/employer',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
    allowedEmails: ['founder@elec-mate.com', 'andrewgangoo91@gmail.com'],
  },
  {
    name: 'College Hub',
    path: '/college',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
    allowedEmails: ['founder@elec-mate.com', 'andrewgangoo91@gmail.com'],
  },
  {
    name: 'Study Centre',
    path: '/study-centre',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
  },
  {
    name: 'Wellbeing',
    path: '/mental-health',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
    dividerAfter: true,
  },
  {
    name: 'Subscriptions',
    path: '/subscriptions',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
  },
  {
    name: 'Settings',
    path: '/settings',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin', 'beta_tester'],
  },
  {
    name: 'Knowledge Uploader',
    path: '/admin/knowledge-uploader',
    roles: ['admin'],
  },
  {
    name: 'Admin Panel',
    path: '/admin',
    roles: ['visitor', 'apprentice', 'electrician', 'employer', 'admin'],
    adminOnly: true,
  },
];
