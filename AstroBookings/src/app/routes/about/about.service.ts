import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor() {}

  getAboutInfo(): string {
    return 'This is information about our company.';
  }
}
