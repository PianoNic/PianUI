export interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Example', icon: 'dashboard', route: '/' },
];
