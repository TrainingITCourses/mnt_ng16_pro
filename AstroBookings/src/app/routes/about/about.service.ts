import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor() {}

  getAboutInfo(): string {
    throw new Error('Test error .');
    //return 'This is information about our company.';
  }
}
