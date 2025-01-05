import { useState, useEffect, useCallback } from 'react';
import { LogEntry, SecondaryMed } from '../types';

const CPR_ALERT_TIME = 120; // 2 minutes
const EPI_WARNING_TIME = 180; // 3 minutes
const EPI_DANGER_TIME = 300; // 5 minutes
const MILESTONE_INTERVAL = 300;

const initialSecondaryMeds: SecondaryMed[] = [
  { id: 'amio', name: 'Amiodarone', doses: 0, interval: 3, icon: 'Pill' },
  { id: 'lido', name: 'Lidocaine', doses: 0, interval: 3, icon: 'Syringe' },
  { id: 'bicarb', name: 'Bicarbonate', doses: 0, icon: 'Beaker' },
  { id: 'calcium', name: 'Calcium', doses: 0, icon: 'TestTube' }
];

export default function useTimerLogic() {
  const [isRunning, setIsRunning] = useState(false);
  const [cprTime, setCprTime] = useState(0);
  const [epiTime, setEpiTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [cprRounds, setCprRounds] = useState(0);
  const [epiDoses, setEpiDoses] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [secondaryMeds, setSecondaryMeds] = useState<SecondaryMed[]>(initialSecondaryMeds);
  const [showMedDrawer, setShowMedDrawer] = useState(false);

  const isCprAlert = cprTime >= CPR_ALERT_TIME;
  const isEpiWarning = epiTime >= EPI_WARNING_TIME;
  const isEpiDanger = epiTime >= EPI_DANGER_TIME;

  const addLog = useCallback((message: string, type: LogEntry['type']) => {
    setLogs(prev => [{
      timestamp: totalTime,
      message,
      type
    }, ...prev]);
  }, [totalTime]);

  const startTimers = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      addLog('Session started', 'milestone');
    }
  }, [isRunning, addLog]);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setCprTime(prev => prev + 1);
        setEpiTime(prev => prev + 1);
        setTotalTime(prev => {
          const newTime = prev + 1;
          if (newTime > 0 && newTime % MILESTONE_INTERVAL === 0) {
            addLog(`${newTime / 60} minutes elapsed`, 'milestone');
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, addLog]);

  const handleStartStop = useCallback(() => {
    setIsRunning(prev => !prev);
    if (isRunning) {
      addLog('Session paused', 'milestone');
    } else {
      startTimers();
    }
  }, [isRunning, startTimers, addLog]);

  const handleCprClick = useCallback(() => {
    startTimers();
    if (isRunning) {
      setCprTime(0);
      setCprRounds(prev => prev + 1);
      addLog(`CPR Round ${cprRounds + 1} completed, pulse check performed`, 'cpr');
    }
  }, [isRunning, cprRounds, startTimers, addLog]);

  const handleEpiClick = useCallback(() => {
    startTimers();
    if (isRunning) {
      setEpiTime(0);
      setEpiDoses(prev => prev + 1);
      addLog(`Epinephrine dose ${epiDoses + 1} administered`, 'epi');
    }
  }, [isRunning, epiDoses, startTimers, addLog]);

  const handleSecondaryMed = useCallback((medId: string) => {
    startTimers();
    if (isRunning) {
      setSecondaryMeds(prev => prev.map(med => {
        if (med.id === medId) {
          const newDoses = med.doses + 1;
          addLog(`${med.name} dose ${newDoses} administered`, 'med');
          return {
            ...med,
            doses: newDoses,
            lastDose: totalTime
          };
        }
        return med;
      }));
    }
  }, [isRunning, totalTime, startTimers, addLog]);

  const resetAll = useCallback(() => {
    setIsRunning(false);
    setCprTime(0);
    setEpiTime(0);
    setTotalTime(0);
    setCprRounds(0);
    setEpiDoses(0);
    setLogs([]);
    setSecondaryMeds(initialSecondaryMeds);
    addLog('Session reset', 'milestone');
  }, [addLog]);

  return {
    cprTime,
    epiTime,
    totalTime,
    cprRounds,
    epiDoses,
    isRunning,
    isCprAlert,
    isEpiWarning,
    isEpiDanger,
    logs,
    secondaryMeds,
    showMedDrawer,
    setShowMedDrawer,
    handleStartStop,
    handleCprClick,
    handleEpiClick,
    handleSecondaryMed,
    resetAll,
    addLog // Export addLog function
  };
}