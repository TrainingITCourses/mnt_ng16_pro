import { ChangeDetectionStrategy, Component } from '@angular/core';
import { exhaustMap, Subject } from 'rxjs';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private registerSubject = new Subject<RegisterDto>();

  constructor(private readonly registerService: RegisterService) {
    this.registerSubject
      .pipe(exhaustMap((registerDto: RegisterDto) => this.registerService.register$(registerDto)))
      .subscribe();
  }

  onRegister(registerDto: RegisterDto): void {
    console.log('onRegister', registerDto);
    this.registerSubject.next(registerDto);
    //this.registerService.register$(registerDto).subscribe((res) => console.log(res));
  }
}
