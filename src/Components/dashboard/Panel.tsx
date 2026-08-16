import type { ReactNode } from 'react';

type PanelProps = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  noBodyPadding?: boolean;
  className?: string;
};

export default function Panel({ title, action, children, noBodyPadding, className = '' }: PanelProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-gray-200">
          <h3 className="text-[14.5px] font-bold text-[#282C34] font-family-playfair">{title}</h3>
          {action}
        </div>
      )}
      <div className={noBodyPadding ? '' : 'p-4 sm:p-5'}>{children}</div>
    </div>
  );
}
