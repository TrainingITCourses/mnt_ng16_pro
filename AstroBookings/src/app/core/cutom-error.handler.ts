import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from '@app/services/log.service';

/**
 * Custom Error Handler, logs the error using the LogService
 * @implements ErrorHandler
 * @requires LogService
 */
@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private readonly logService: LogService) {}

  handleError(error: Error): void {
    this.logService.log(`👽 ${error.message}`);
    this.logService.error(error);
  }
}
