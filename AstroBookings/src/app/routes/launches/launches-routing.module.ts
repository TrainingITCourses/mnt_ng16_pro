import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchPage } from './launch.page';

const routes: Routes = [{ path: ':id', component: LaunchPage, title: 'Launch Details' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaunchesRoutingModule {}
