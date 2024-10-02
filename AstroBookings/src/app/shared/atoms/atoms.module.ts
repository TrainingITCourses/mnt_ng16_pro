import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkAtom } from './link.atom';

@NgModule({
  declarations: [LinkAtom],
  imports: [CommonModule, RouterModule],
  exports: [LinkAtom],
})
export class AtomsModule {}
