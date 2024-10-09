import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonAtom } from './button.atom';
import { LinkAtom } from './link.atom';
import { PageHeaderBlock } from './page-header.block';

@NgModule({
  declarations: [LinkAtom, PageHeaderBlock, ButtonAtom],
  imports: [CommonModule, RouterModule],
  exports: [LinkAtom, PageHeaderBlock, ButtonAtom],
})
export class UiModule {}
