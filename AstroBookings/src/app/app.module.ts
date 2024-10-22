import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_SOURCE } from '@app/services/log.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

/**
 * Root Module just used to bootstrap the application
 * - Provide LOG_SOURCE just used to confront with the CoreModule one
 */
@NgModule({
  imports: [AppRoutingModule, BrowserModule, CoreModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: LOG_SOURCE, useValue: '🏠 AppModule' }],
})
export class AppModule {}
