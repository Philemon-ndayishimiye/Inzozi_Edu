import type { Option } from '../Components/Select';

// Rwanda's 5 provinces and their districts. Used to group the flat
// `districts` list (Types/district.ts) under a province step in the
// home page location filter, since schools are only tagged with a
// district in the API today, not a province.
export const PROVINCE_DISTRICTS: Record<string, string[]> = {
  'Kigali City': ['Nyarugenge', 'Gasabo', 'Kicukiro'],
  'Northern Province': ['Musanze', 'Gicumbi', 'Rulindo', 'Burera', 'Gakenke'],
  'Southern Province': ['Huye', 'Nyanza', 'Gisagara', 'Nyaruguru', 'Nyamagabe', 'Ruhango', 'Muhanga', 'Kamonyi'],
  'Eastern Province': ['Rwamagana', 'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera'],
  'Western Province': ['Karongi', 'Rutsiro', 'Rubavu', 'Nyabihu', 'Ngororero', 'Rusizi', 'Nyamasheke'],
};

export const PROVINCE_OPTIONS: Option[] = Object.keys(PROVINCE_DISTRICTS).map((p) => ({
  value: p,
  label: p,
}));

export function districtsForProvince(province: string): Option[] {
  const list = PROVINCE_DISTRICTS[province] ?? [];
  return list.map((d) => ({ value: d, label: d }));
}

export function provinceForDistrict(district: string): string | undefined {
  return Object.keys(PROVINCE_DISTRICTS).find((p) =>
    PROVINCE_DISTRICTS[p].includes(district),
  );
}
