import React from 'react';
import { Download } from 'lucide-react';
import { LogEntry, SecondaryMed, Rhythm } from '../types';
import { generateShortReport, generateLongReport } from '../utils/exportUtils';

interface ExportPanelProps {
  totalTime: number;
  cprRounds: number;
  secondaryMeds: SecondaryMed[];
  rhythms: Rhythm[];
  logs: LogEntry[];
}

const ExportPanel: React.FC<ExportPanelProps> = ({
  totalTime,
  cprRounds,
  secondaryMeds,
  rhythms,
  logs,
}) => {
  const handleExport = (type: 'short' | 'long') => {
    const content = type === 'short'
      ? generateShortReport(totalTime, cprRounds, secondaryMeds, rhythms)
      : generateLongReport(logs);

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cpr-report-${type}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => handleExport('short')}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Export (Short)</span>
      </button>
      <button
        onClick={() => handleExport('long')}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Export (Long)</span>
      </button>
    </div>
  );
};

export default ExportPanel;