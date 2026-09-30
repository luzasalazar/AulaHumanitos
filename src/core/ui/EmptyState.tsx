import { Inbox, type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  color?: string;
  icon?: LucideIcon;
}

export default function EmptyState({ message, color = '#882B8E', icon: Icon = Inbox }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-black/10 bg-white flex flex-col items-center justify-center text-center py-20 px-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}1A` }}
      >
        <Icon size={30} color={color} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <p className="font-montserrat text-base text-negro-suave/60 max-w-sm">{message}</p>
    </div>
  );
}
