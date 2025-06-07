import { FC, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CallbackColumnProps {
  title: string;
  status: string;
  icon: LucideIcon;
  iconColor: string;
  children: ReactNode;
}

const CallbackColumn: FC<CallbackColumnProps> = ({
  title,
  status,
  icon: Icon,
  iconColor,
  children,
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-lg shadow border border-neutral-200"
    >
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center">
          <Icon className={`h-5 w-5 ${iconColor} mr-2`} />
          <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default CallbackColumn;