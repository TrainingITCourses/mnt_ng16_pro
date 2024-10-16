import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from '@app/services/log.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private readonly logService: LogService) {}

  handleError(error: Error): void {
    this.logService.error('👽 ' + error.message);
  }
}
