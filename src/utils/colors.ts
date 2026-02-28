const PALETTE = [
  '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b',
  '#ef4444', '#ec4899', '#f97316', '#14b8a6', '#6366f1',
  '#84cc16', '#a855f7', '#0ea5e9', '#d946ef', '#22d3ee',
];

export function getCountryColor(country: string): string {
  let hash = 0;
  for (let i = 0; i < country.length; i++) {
    hash = country.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}
