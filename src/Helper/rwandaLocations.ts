import { getProvinces, getDistricts, getSectors, getCells, getVillages } from 'rwanda-locations';

// The library throws on an unknown province/district/etc (e.g. while a form
// still has an empty selection) — these wrappers turn that into an empty
// list instead, which is what a cascading <select> actually wants.

export function listProvinces(): string[] {
  return getProvinces();
}

export function listDistricts(province?: string): string[] {
  if (!province) {return [];}
  try {
    return getDistricts(province);
  } catch {
    return [];
  }
}

export function listSectors(province?: string, district?: string): string[] {
  if (!province || !district) {return [];}
  try {
    return getSectors(province, district);
  } catch {
    return [];
  }
}

export function listCells(province?: string, district?: string, sector?: string): string[] {
  if (!province || !district || !sector) {return [];}
  try {
    return getCells(province, district, sector);
  } catch {
    return [];
  }
}

export function listVillages(province?: string, district?: string, sector?: string, cell?: string): string[] {
  if (!province || !district || !sector || !cell) {return [];}
  try {
    return getVillages(province, district, sector, cell);
  } catch {
    return [];
  }
}

// "City Of Kigali" is the library's official province name (needed as-is
// for the lookup functions above) but reads oddly as a form label.
export function provinceLabel(province: string): string {
  return province === 'City Of Kigali' ? 'Kigali City' : `${province} Province`;
}
