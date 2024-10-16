import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {
  LaunchesAbstractRepository,
  LaunchesMemoryRepository,
  LaunchesRestRepository,
} from '@app/services/launches.repository';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
import { environment } from 'environments/environment.development';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ErrorModule } from './core/error.module';
import { LogHttpInterceptor } from './core/log-http.interceptor';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, CoreModule, ErrorModule, HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LaunchesAbstractRepository,
      useFactory: launchesRepositoryFactory,
      deps: [HttpClient],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerFactory,
      deps: [HttpClient],
      multi: true,
    },
    {
      provide: LOG_SOURCE,
      useValue: '🚀 App Module',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogHttpInterceptor,
      multi: true,
      deps: [LogService],
    },
  ],
})
export class AppModule {}

function launchesRepositoryFactory(httpClient: HttpClient) {
  if (environment.useRestApi) {
    return new LaunchesRestRepository(httpClient);
  } else {
    return new LaunchesMemoryRepository();
  }
}

function initializerFactory(http: HttpClient) {
  const interna = () => getTime(http);
  return interna;
}

function getTime(http: HttpClient) {
  return http.get('http://worldtimeapi.org/api/timezone/Europe/Madrid').subscribe((data) => {
    console.log(data);
  });
}
