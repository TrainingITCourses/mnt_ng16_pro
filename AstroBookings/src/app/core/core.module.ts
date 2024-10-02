import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../shared/atoms/atoms.module';
import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, AtomsModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
