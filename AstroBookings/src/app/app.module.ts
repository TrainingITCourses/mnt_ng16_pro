import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  LaunchesAbstractRepository,
  LaunchesMemoryRepository,
  LaunchesRestRepository,
} from '@app/services/launches.repository';
import { environment } from 'environments/environment.development';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, CoreModule, HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LaunchesAbstractRepository,
      useFactory: launchesRepositoryFactory,
      deps: [HttpClient],
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
