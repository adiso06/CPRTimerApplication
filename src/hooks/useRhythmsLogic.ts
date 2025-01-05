import { useState } from 'react';
import { Rhythm } from '../types';

const initialRhythms: Rhythm[] = [
  { id: 'asystole', name: 'Asystole', shortName: 'ASY', icon: 'Activity' },
  { id: 'pea', name: 'Pulseless Electrical Activity', shortName: 'PEA', icon: 'Activity' },
  { id: 'vf', name: 'Ventricular Fibrillation', shortName: 'VF', icon: 'Activity' },
  { id: 'vt', name: 'Pulseless Ventricular Tachycardia', shortName: 'VT', icon: 'Activity' },
];

export function useRhythmsLogic() {
  const [rhythms, setRhythms] = useState<Rhythm[]>(initialRhythms);
  const [showRhythmDrawer, setShowRhythmDrawer] = useState(false);

  return {
    rhythms,
    setRhythms,
    showRhythmDrawer,
    setShowRhythmDrawer,
  };
}