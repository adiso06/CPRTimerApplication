export interface LogEntry {
  timestamp: number;
  message: string;
  type: 'cpr' | 'epi' | 'med' | 'milestone';
}

export interface SecondaryMed {
  id: string;
  name: string;
  doses: number;
  interval?: number; // Optional reminder interval in minutes
  lastDose?: number; // Timestamp of last dose
  icon: string;
}