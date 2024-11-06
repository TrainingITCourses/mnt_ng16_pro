import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from '@app/ui/ui.module';

import { BookingsFormComponent } from './bookings-form.component';
import { LaunchDetailsComponent } from './launch-details.component';
import { LaunchPage } from './launch.page';
import { LaunchesRoutingModule } from './launches-routing.module';

@NgModule({
  declarations: [LaunchPage, LaunchDetailsComponent, BookingsFormComponent],
  imports: [CommonModule, LaunchesRoutingModule, UiModule],
})
export class LaunchesModule {}
