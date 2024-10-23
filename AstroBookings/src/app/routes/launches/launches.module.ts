import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from '@app/ui/ui.module';

import { LaunchDetailsComponent } from './launch-details.component';
import { LaunchPage } from './launch.page';
import { LaunchesRoutingModule } from './launches-routing.module';

@NgModule({
  declarations: [LaunchPage, LaunchDetailsComponent],
  imports: [CommonModule, LaunchesRoutingModule, UiModule],
})
export class LaunchesModule {}
