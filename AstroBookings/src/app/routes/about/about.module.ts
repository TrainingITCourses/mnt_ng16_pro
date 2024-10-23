import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LOG_SOURCE } from '@app/services/log.service';
import { UiModule } from '@app/ui/ui.module';
import { AboutContentComponent } from './about-content.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page';

@NgModule({
  imports: [CommonModule, AboutRoutingModule, UiModule],
  declarations: [AboutPage, AboutContentComponent],
  providers: [{ provide: LOG_SOURCE, useValue: '📘  AboutModule' }],
})
export class AboutModule {}
