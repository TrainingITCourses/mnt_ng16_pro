import { ErrorHandler, NgModule } from '@angular/core';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
import { CustomErrorHandler } from './cutom-error.handler';

@NgModule({
  providers: [
    {
      provide: LOG_SOURCE,
      useValue: '🤯 Error Module',
    },
    {
      provide: LogService,
      useClass: LogService,
      deps: [LOG_SOURCE],
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ],
})
export class ErrorModule {}
