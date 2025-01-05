import React from 'react';
import { ChevronDown, ChevronUp, Activity, Heart, Zap } from 'lucide-react';
import { Rhythm } from '../types';
import { formatTime } from '../utils/timeFormat';

interface RhythmsPanelProps {
  rhythms: Rhythm[];
  onRhythmClick: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  totalTime: number;
}

const RhythmsPanel: React.FC<RhythmsPanelProps> = ({
  rhythms,
  onRhythmClick,
  isOpen,
  onToggle,
  totalTime,
}) => {
  const getTimeSinceLastCheck = (timestamp?: number) => {
    if (!timestamp) return null;
    const timeSince = totalTime - timestamp;
    const minutes = Math.floor(timeSince / 60);
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-700"
      >
        <span className="font-semibold">Rhythms</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="p-4 grid grid-cols-2 gap-3">
          {rhythms.map(rhythm => {
            const timeSince = getTimeSinceLastCheck(rhythm.timestamp);

            return (
              <button
                key={rhythm.id}
                onClick={() => onRhythmClick(rhythm.id)}
                className="p-3 rounded-lg flex flex-col items-center gap-2 transition-colors bg-slate-700 hover:bg-slate-600"
              >
                <Activity className="w-5 h-5" />
                <span className="text-sm font-medium">{rhythm.name}</span>
                <span className="text-xs opacity-80">{rhythm.shortName}</span>
                {timeSince && (
                  <span className="text-xs opacity-70">
                    Last checked {timeSince}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RhythmsPanel;