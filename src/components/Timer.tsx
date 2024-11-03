import React from 'react';
import { formatTime } from '../utils/timeFormat';

interface TimerProps {
  icon: React.ReactNode;
  title: string;
  time: number;
  isAlert?: boolean;
  isWarning?: boolean;
  isDanger?: boolean;
  rounds: number;
  onClick: () => void;
  label: string;
}

const Timer: React.FC<TimerProps> = ({
  icon,
  title,
  time,
  isAlert,
  isWarning,
  isDanger,
  rounds,
  onClick,
  label,
}) => {
  const getBackgroundColor = () => {
    if (isDanger) return 'bg-red-500 animate-pulse';
    if (isWarning) return 'bg-amber-500';
    if (isAlert) return 'bg-red-500 animate-pulse';
    return 'bg-slate-800 hover:bg-slate-700';
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl transition-all ${getBackgroundColor()}`}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <div className="text-3xl font-bold mb-2">{formatTime(time)}</div>
      <div className="text-sm opacity-80">
        {rounds} {label}
      </div>
    </button>
  );
};

export default Timer;