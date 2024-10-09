import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from 'src/app/shared/ui/ui.module';
import { BannerComponent } from './banner.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  declarations: [HomePage, BannerComponent],
  imports: [CommonModule, HomeRoutingModule, UiModule],
})
export class HomeModule {}
