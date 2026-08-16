type BadgeVariant = 'pending' | 'approved' | 'rejected' | 'admin' | 'schoolManager' | 'admissionManager' | 'neutral';

const styles: Record<BadgeVariant, string> = {
  pending: 'bg-[#FFF3E0] text-[#736213]',
  approved: 'bg-[#E7F5EA] text-[#1E7A34]',
  rejected: 'bg-[#FBEAE8] text-[#B10E1E]',
  admin: 'bg-[#D9E8F6] text-[#1A4480]',
  schoolManager: 'bg-[#FFF3E0] text-[#736213]',
  admissionManager: 'bg-[#EAE3F5] text-[#5B3A9E]',
  neutral: 'bg-gray-100 text-gray-600',
};

export default function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[10.5px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${styles[variant]}`}>
      {children}
    </span>
  );
}
