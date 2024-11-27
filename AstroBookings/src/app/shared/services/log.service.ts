import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

/**
 * Injection Token for the Log Source, used to identify the source of the log
 */
export const LOG_SOURCE = new InjectionToken<string>('logSource');

/**
 * Log Service, logs messages to the console
 * @param source - The source of the log, defaults to 'Unknown'
 */
@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(@Optional() @Inject(LOG_SOURCE) private source: string) {
    this.source = source || 'Unknown';
  }

  log(message: string): void {
    console.log(`[${this.source}] ${message}`);
  }

  error(message: string | Error): void {
    try {
      const errorJson = JSON.stringify(message);
      console.error(`[${this.source}] ${errorJson}`);
    } catch (error) {
      console.error(`[${this.source}] ${message}`);
    }
  }

  warn(message: string): void {
    console.warn(`[${this.source}] ${message}`);
  }
}
