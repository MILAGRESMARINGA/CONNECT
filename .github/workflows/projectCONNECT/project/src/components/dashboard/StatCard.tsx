import { FC, useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import DashboardModal from './DashboardModal';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  onClick?: () => void;
  modalContent?: React.ReactNode;
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  onClick,
  modalContent
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-success-600';
      case 'decrease':
        return 'text-error-600';
      default:
        return 'text-neutral-500';
    }
  };

  const handleClick = () => {
    if (modalContent) {
      setIsModalOpen(true);
    }
    onClick?.();
  };

  return (
    <>
      <div 
        className={`bg-white overflow-hidden shadow rounded-lg transition-transform duration-200 ${modalContent ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
        onClick={handleClick}
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <Icon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-neutral-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-neutral-900">
                  {value}
                </div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${getChangeColor()}`}>
                  {change}
                </div>
              </dd>
            </div>
          </div>
        </div>
        <div className="bg-neutral-50 px-5 py-3">
          <div className="text-sm">
            <button
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Ver detalhes
            </button>
          </div>
        </div>
      </div>

      {modalContent && (
        <DashboardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
        >
          {modalContent}
        </DashboardModal>
      )}
    </>
  );
};

export default StatCard;