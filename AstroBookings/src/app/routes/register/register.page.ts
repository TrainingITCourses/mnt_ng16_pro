import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  constructor(private readonly registerService: RegisterService) {}

  onRegister(registerDto: RegisterDto): void {
    console.log('onRegister', registerDto);
    this.registerService.register$(registerDto).subscribe((res) => console.log(res));
  }
}
