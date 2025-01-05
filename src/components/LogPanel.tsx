import React from 'react';
import { LogEntry } from '../types';
import { formatTime } from '../utils/timeFormat';
import { ScrollText } from 'lucide-react';

interface LogPanelProps {
  logs: LogEntry[];
}

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <ScrollText className="w-5 h-5" />
        <h2 className="font-semibold">Event Log</h2>
      </div>
      <div className="h-48 overflow-y-auto space-y-2 text-sm">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              log.type === 'cpr'
                ? 'bg-blue-900/30'
                : log.type === 'epi'
                ? 'bg-purple-900/30'
                : log.type === 'med'
                ? 'bg-green-900/30'
                : 'bg-slate-700/30'
            }`}
          >
            <span className="font-mono">{formatTime(log.timestamp)}</span>
            <span className="mx-2">-</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogPanel;