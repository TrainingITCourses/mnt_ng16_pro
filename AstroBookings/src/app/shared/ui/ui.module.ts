import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkAtom } from './link.atom';
import { PageHeaderBlock } from './page-header.block';
import { ButtonAtom } from './button.atom';

@NgModule({
  declarations: [LinkAtom, PageHeaderBlock, ButtonAtom],
  imports: [CommonModule, RouterModule],
  exports: [LinkAtom, PageHeaderBlock],
})
export class UiModule {}
