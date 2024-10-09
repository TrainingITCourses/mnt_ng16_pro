import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { FooterWidget } from './footer.widget';
import { HeaderWidget } from './header.widget';

@NgModule({
  declarations: [HeaderWidget, FooterWidget],
  imports: [CommonModule, RouterModule, UiModule],
  exports: [HeaderWidget, FooterWidget],
})
export class LayoutModule {}
