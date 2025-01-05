export interface LogEntry {
  timestamp: number;
  message: string;
  type: 'cpr' | 'epi' | 'med' | 'milestone' | 'rhythm';
}

export interface SecondaryMed {
  id: string;
  name: string;
  doses: number;
  interval?: number;
  lastDose?: number;
  icon: string;
}

export interface Rhythm {
  id: string;
  name: string;
  shortName: string;
  timestamp?: number;
  icon: string;
}