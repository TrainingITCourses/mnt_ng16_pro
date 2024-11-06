import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsyncBlock } from './async.block';
import { ButtonAtom } from './button.atom';
import { ControlBlock } from './control.block';
import { LinkAtom } from './link.atom';
import { ListBlock } from './list.block';
import { PageHeaderBlock } from './page-header.block';
import { SearchBlock } from './search.block';

@NgModule({
  declarations: [
    ControlBlock,
    LinkAtom,
    PageHeaderBlock,
    ButtonAtom,
    AsyncBlock,
    ListBlock,
    SearchBlock,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    ControlBlock,
    LinkAtom,
    PageHeaderBlock,
    ButtonAtom,
    AsyncBlock,
    ListBlock,
    ReactiveFormsModule,
    SearchBlock,
  ],
})
export class UiModule {}
