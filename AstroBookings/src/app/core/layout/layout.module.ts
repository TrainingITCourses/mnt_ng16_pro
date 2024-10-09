import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, UiModule],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
