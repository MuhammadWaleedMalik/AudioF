import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="card stat-card">
      <h3 className="stat-title">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="stat-value">{value}</span>
        {icon && <div className="text-primary-light">{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;