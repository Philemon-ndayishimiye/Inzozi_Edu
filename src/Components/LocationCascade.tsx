import { SelectInput } from './seats/SelectInput';
import { listProvinces, listDistricts, listSectors, listCells, listVillages, provinceLabel } from '../Helper/rwandaLocations';

export type LocationValue = {
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
};

type LocationCascadeProps = {
  value: LocationValue;
  onChange: (next: LocationValue) => void;
  levels?: 2 | 3 | 4 | 5;
  required?: boolean;
};

const toOptions = (items: string[], label: (v: string) => string = (v) => v) =>
  items.map((v) => ({ value: v, label: label(v) }));

export default function LocationCascade({ value, onChange, levels = 5, required = false }: LocationCascadeProps) {
  const provinces = listProvinces();
  const districts = listDistricts(value.province);
  const sectors = listSectors(value.province, value.district);
  const cells = listCells(value.province, value.district, value.sector);
  const villages = listVillages(value.province, value.district, value.sector, value.cell);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
      <SelectInput
        label="Province"
        name="province"
        required={required}
        placeholder="Select province"
        options={toOptions(provinces, provinceLabel)}
        value={value.province ?? ''}
        onChange={(e) => onChange({ province: e.target.value, district: '', sector: '', cell: '', village: '' })}
      />
      <SelectInput
        label="District"
        name="district"
        required={required}
        placeholder={value.province ? 'Select district' : 'Select a province first'}
        options={toOptions(districts)}
        value={value.district ?? ''}
        onChange={(e) => onChange({ ...value, district: e.target.value, sector: '', cell: '', village: '' })}
      />
      {levels >= 3 && (
        <SelectInput
          label="Sector"
          name="sector"
          required={required}
          placeholder={value.district ? 'Select sector' : 'Select a district first'}
          options={toOptions(sectors)}
          value={value.sector ?? ''}
          onChange={(e) => onChange({ ...value, sector: e.target.value, cell: '', village: '' })}
        />
      )}
      {levels >= 4 && (
        <SelectInput
          label="Cell"
          name="cell"
          required={required}
          placeholder={value.sector ? 'Select cell' : 'Select a sector first'}
          options={toOptions(cells)}
          value={value.cell ?? ''}
          onChange={(e) => onChange({ ...value, cell: e.target.value, village: '' })}
        />
      )}
      {levels >= 5 && (
        <SelectInput
          label="Village"
          name="village"
          required={required}
          placeholder={value.cell ? 'Select village' : 'Select a cell first'}
          options={toOptions(villages)}
          value={value.village ?? ''}
          onChange={(e) => onChange({ ...value, village: e.target.value })}
        />
      )}
    </div>
  );
}
