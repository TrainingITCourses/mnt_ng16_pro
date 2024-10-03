import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BannerComponent } from './banner.component';

@NgModule({
  declarations: [HomePage, BannerComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
