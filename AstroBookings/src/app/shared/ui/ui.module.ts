import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncBlock } from './async.block';
import { ButtonAtom } from './button.atom';
import { LinkAtom } from './link.atom';
import { ListBlock } from './list.block';
import { PageHeaderBlock } from './page-header.block';

@NgModule({
  declarations: [LinkAtom, PageHeaderBlock, ButtonAtom, AsyncBlock, ListBlock],
  imports: [CommonModule, RouterModule],
  exports: [LinkAtom, PageHeaderBlock, ButtonAtom, AsyncBlock, ListBlock],
})
export class UiModule {}
