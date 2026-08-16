type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
};

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm min-w-0">
      <div className="font-mono text-[10px] uppercase tracking-wide text-gray-400">{label}</div>
      <div className="font-family-playfair text-[24px] text-[#05416B] mt-1.5 break-words">{value}</div>
      {sub && <div className="text-[11px] text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}
