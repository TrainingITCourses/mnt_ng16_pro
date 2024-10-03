import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from 'src/app/shared/atoms/atoms.module';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, AtomsModule],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
