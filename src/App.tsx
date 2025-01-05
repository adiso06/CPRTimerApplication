// src/App.tsx (or App.jsx)

import React from 'react';
import Timer from './components/Timer';
import TotalTime from './components/TotalTime';
import LogPanel from './components/LogPanel';
import SecondaryMeds from './components/SecondaryMeds';
import FlowStep from './components/FlowStep';
import ExportPanel from './components/ExportPanel';
import RhythmsPanel from './components/RhythmsPanel';
import { Clock, Heart, Syringe } from 'lucide-react';

import useTimerLogic from './hooks/useTimerLogic';
import { useRhythmsLogic } from './hooks/useRhythmsLogic';

function App() {
  // Timers / meds / logs
  const {
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
  } = useTimerLogic();

  // Rhythms
  const {
    rhythms,
    setRhythms,
    showRhythmDrawer,
    setShowRhythmDrawer,
    handleRhythmClick,
  } = useRhythmsLogic();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">CPR Timer</h1>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleStartStop}
              className={`px-4 py-2 rounded-lg font-semibold ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-emerald-500 hover:bg-emerald-600'
              } transition-colors`}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
            {isRunning && (
              <button
                onClick={resetAll}
                className="px-4 py-2 rounded-lg font-semibold bg-slate-600 hover:bg-slate-700 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </header>

        {/* Total Time */}
        <TotalTime icon={<Clock className="w-6 h-6" />} time={totalTime} />

        {/* Timer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Timer
            icon={<Heart className="w-6 h-6" />}
            title="CPR Timer"
            time={cprTime}
            isAlert={isCprAlert}
            rounds={cprRounds}
            onClick={handleCprClick}
            label="Rounds"
          />
          <Timer
            icon={<Syringe className="w-6 h-6" />}
            title="Epinephrine"
            time={epiTime}
            isWarning={isEpiWarning}
            isDanger={isEpiDanger}
            rounds={epiDoses}
            onClick={handleEpiClick}
            label="Doses"
          />
        </div>

        {/* Secondary Med Drawer */}
        <SecondaryMeds
          meds={secondaryMeds}
          onMedClick={handleSecondaryMed}
          isOpen={showMedDrawer}
          onToggle={() => setShowMedDrawer(prev => !prev)}
          totalTime={totalTime}
        />

        {/* Rhythms Panel */}
        <RhythmsPanel
          rhythms={rhythms}
          onRhythmClick={(id) => handleRhythmClick(id, totalTime)}
          isOpen={showRhythmDrawer}
          onToggle={() => setShowRhythmDrawer(prev => !prev)}
          totalTime={totalTime}
        />

        {/* ACLS Algorithm Flow */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            ACLS Algorithm Flow
          </h2>

          <FlowStep
            title="Initial Steps"
            steps={['Start CPR', 'Give oxygen', 'Attach monitor/defibrillator']}
          />

          <FlowStep
            title="Shockable Rhythm (VF/pVT)"
            steps={[
              'Give shock',
              'Resume CPR immediately for 2 minutes',
              'Establish IV/IO access',
              'Give epinephrine every 3-5 minutes',
              'Consider advanced airway',
              'Consider antiarrhythmic (amiodarone or lidocaine)',
              'Treat reversible causes',
            ]}
          />

          <FlowStep
            title="Non-Shockable Rhythm (Asystole/PEA)"
            steps={[
              'Resume CPR immediately',
              'Give epinephrine ASAP, then every 3-5 minutes',
              'Establish IV/IO access',
              'Consider advanced airway',
              'Treat reversible causes',
            ]}
          />

          <FlowStep
            title="If ROSC Achieved"
            steps={[
              'Begin post-cardiac arrest care',
              'Treat reversible causes',
              'Consider appropriateness of continued resuscitation',
            ]}
          />
        </div>

        {/* Export Panel */}
        <ExportPanel
          totalTime={totalTime}
          cprRounds={cprRounds}
          secondaryMeds={secondaryMeds}
          rhythms={rhythms}
          logs={logs}
        />

        {/* Log Panel */}
        <LogPanel logs={logs} />
      </div>
    </div>
  );
}

export default App;
