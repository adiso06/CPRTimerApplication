import React from 'react';
import { formatTime } from '../utils/timeFormat';

interface TotalTimeProps {
  icon: React.ReactNode;
  time: number;
}

const TotalTime: React.FC<TotalTimeProps> = ({ icon, time }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="font-semibold">Total Time</span>
      </div>
      <div className="text-3xl font-bold">{formatTime(time)}</div>
    </div>
  );
}

export default TotalTime;