import React from 'react';
import { SecondaryMed } from '../types';
import { ChevronDown, ChevronUp, Pill, Syringe, Beaker, TestTube } from 'lucide-react';
import { formatTime } from '../utils/timeFormat';

interface SecondaryMedsProps {
  meds: SecondaryMed[];
  onMedClick: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  totalTime: number;
}

const iconMap = {
  Pill,
  Syringe,
  Beaker,
  TestTube
};

const SecondaryMeds: React.FC<SecondaryMedsProps> = ({
  meds,
  onMedClick,
  isOpen,
  onToggle,
  totalTime
}) => {
  const getTimeSinceLastDose = (lastDose?: number) => {
    if (!lastDose) return null;
    const timeSince = totalTime - lastDose;
    const minutes = Math.floor(timeSince / 60);
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-700"
      >
        <span className="font-semibold">Secondary Medications</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="p-4 grid grid-cols-2 gap-3">
          {meds.map(med => {
            const Icon = iconMap[med.icon as keyof typeof iconMap];
            const isReminder = med.interval && med.lastDose && 
              (totalTime - med.lastDose) >= med.interval * 60;
            const timeSince = getTimeSinceLastDose(med.lastDose);

            return (
              <button
                key={med.id}
                onClick={() => onMedClick(med.id)}
                className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  isReminder
                    ? 'bg-amber-500/20 hover:bg-amber-500/30'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{med.name}</span>
                <span className="text-xs opacity-80">
                  {med.doses} {med.doses === 1 ? 'dose' : 'doses'}
                </span>
                {timeSince && (
                  <span className="text-xs opacity-70">
                    {timeSince}
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

export default SecondaryMeds;