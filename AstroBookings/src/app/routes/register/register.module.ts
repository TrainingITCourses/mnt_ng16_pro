import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { RegisterFormComponent } from './register-form.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  declarations: [RegisterPage, RegisterFormComponent],
  imports: [CommonModule, FormsModule, RegisterRoutingModule, UiModule],
})
export class RegisterModule {}
