import { LogEntry, SecondaryMed, Rhythm } from '../types';
import { formatTime } from './timeFormat';

export function generateShortReport(
  totalTime: number,
  cprRounds: number,
  secondaryMeds: SecondaryMed[],
  rhythms: Rhythm[],
): string {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  
  // Get administered medications
  const administeredMeds = secondaryMeds
    .filter(med => med.doses > 0)
    .map(med => `${med.name} (${med.doses} doses)`)
    .join(', ');

  // Find last rhythm check
  const lastRhythm = [...rhythms]
    .filter(r => r.timestamp)
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))[0];

  const outcome = lastRhythm 
    ? `Last recorded rhythm was ${lastRhythm.name} at ${formatTime(lastRhythm.timestamp || 0)}`
    : 'No rhythm recorded';

  return `Coded patient at ${time} on ${date}. Performed ${cprRounds} rounds of chest compressions. ` +
    `${administeredMeds ? `Administered ${administeredMeds}.` : 'No medications administered.'} ` +
    `${outcome}. Total code time: ${formatTime(totalTime)}.`;
}

export function generateLongReport(logs: LogEntry[]): string {
  return logs
    .map(log => `[${formatTime(log.timestamp)}] ${log.message}`)
    .join('\n');
}