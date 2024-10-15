import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@app/ui/ui.module';
import { AboutContentComponent } from './about-content.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page';

@NgModule({
  imports: [CommonModule, AboutRoutingModule, UiModule],
  declarations: [AboutPage, AboutContentComponent],
})
export class AboutModule {}
