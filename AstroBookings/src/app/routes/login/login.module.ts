import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@app/ui/ui.module';
import { LoginFormComponent } from './login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  declarations: [LoginPage, LoginFormComponent],
  imports: [CommonModule, FormsModule, LoginRoutingModule, UiModule],
})
export class LoginModule {}
